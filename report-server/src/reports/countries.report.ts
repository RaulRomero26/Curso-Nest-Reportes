import { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';
import { countries as Country } from '@prisma/client';

const style : StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 10]
    },
    subheader: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
    },
    body: {
        margin: [0, 0, 0, 70],
        alignment: 'justify'
    },
    signature: {
        fontSize: 14,
        bold: true,
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    }
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    countries: Country[];
}

export const getCountryReport = ( options : ReportOptions ): TDocumentDefinitions => {

    const { title, subTitle, countries } = options;

    return {
        styles: style,
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Countries Report',
            subTitle: subTitle ?? 'List of countries'
        }),
        pageMargins: [ 40, 110, 40, 60 ],
        content: [
           
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ 50, 50, 50, '*', 'auto', '*' ],
                
                  body: [
                    [ 'ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name' ],
                    ...countries.map( country => [
                        country.id.toString(),
                        country.iso2,
                        country.iso3,
                       { text:  country.name, bold: true },
                        country.continent,
                        country.local_name
                        
                    ])
                  ],
                },
            },
            // Tabla de totales
            {
                text: 'Totales: ',
                style: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 40, 0, 0],
                }
            },
            {
                layout: 'noBorders', // optional
                table: {
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: 'Total de paises: ',
                                bold: true
                            },
                            {
                                text: countries.length.toString(),
                                bold: true
                            }
                        ]
                    ]
                }
            }
        ],
        footer: footerSection
    };

};