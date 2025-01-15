import { TDocumentDefinitions, Content, StyleDictionary } from 'pdfmake/interfaces';
import { DateFormater } from '../helpers/date-formatter';
import { footerSection } from './sections/footer.section';
import { CurrencyFormatter } from '../helpers/currency-formatter';

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10,30]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [ 0, 30, 0, 0]
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 0]
    }
}

export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}


interface ReportValues {
    titile?: string;
    subTitle?: string;
    data: CompleteOrder;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {

    const { data } = values;
    console.log(data);
    
    const { customers, order_details } = data;

    const subTotal = order_details.reduce((acc, detail) => acc + (+detail.products.price * detail.quantity),
    0,
    );   

    const total = subTotal + (subTotal * 0.15);

    return {
        styles: styles,
        header: logo,
        pageMargins: [ 40, 60, 40, 60 ],
        footer: footerSection,
        content:[
            //Headers
            {
                text: 'Tucan Code',
                style: 'header'
            },
            // Address y numero de recibo
            {
                columns: [
                    {
                        text: `
                        15 Montgomery Str, Suite 100,
                        Ottawa ON K2Y 9X1, CANADA
                        BN: 12783671823
                        https://devtalles.com`
                    },
                    {
                        text: [
                            { text: `Recibo no. ${data.order_id}\n`, bold: true },
                            `Fecha del recibo ${DateFormater.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormater.getDDMMMMYYYY(new Date())}\n\n`
                        ],
                        alignment: 'right'
                    }
                ]
            },
            //QR 
            {
                qr: 'https://tucancode.com',
                fit: 75,
                alignment: 'right'
            },
            //Direccion del Cliente
            {
                text: [
                    {
                        text: 'Cobrar a:\n',
                        style: 'subHeader'
                    },
                    `Razón Social: ${customers.customer_name}
                    ${customers.address}`,
                ]
            },
            //Detalles de la orden Tabla
            {   
                layout: 'headerLineOnly',
                margin: [0,20],
                table: {
                    headerRows: 1,
                    widths: [50,'*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((detail) => {
                            return [
                                detail.order_detail_id.toString(),
                                detail.products.product_name,
                                detail.quantity.toString(),
                                {
                                    text: CurrencyFormatter.formatCurrency(+detail.products.price),
                                    alignment: 'right'
                                },
                                {
                                    text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                                    alignment: 'right'
                                },  
                            ]
                        })
                    ]
                
                }
            },
            //Salto de linea
            '\n\n',
            //Totales
            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'Subtotal',
                                    {
                                       text: CurrencyFormatter.formatCurrency(subTotal),
                                       alignment: 'right', 
                                    },
                                ],
                                [
                                    { text: 'Total', bold: true },
                                    {
                                       text: CurrencyFormatter.formatCurrency(total),
                                       alignment: 'right', 
                                       bold: true
                                    },
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }

}