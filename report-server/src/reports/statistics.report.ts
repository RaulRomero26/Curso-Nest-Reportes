import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from "src/helpers/chart-utils";
import { chartJsToImage } from '../helpers/chart-utils';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';


interface TopCountry{
    country: string;
    customers: number;
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}



export const getStatisticsReport = async (options:ReportOptions): Promise<TDocumentDefinitions> => {

    const [donutChart, lineChart, barChart1, barChart2]  = await Promise.all(
        [
            getDonutChart({
                entries: options.topCountries.map((c) => ({
                    label: c.country,
                    value: c.customers
                })),
                position: 'left'
            }),
            getLineChart(),
            getBarsChart(),
            getBarsChart(),
        ]
    );

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],//izquierda arriva derecha abajo
        header: headerSection({
            title: options.title ?? 'Estadísticas de clientes',
            subTitle: options.subTitle ?? 'Top 10 países con más clientes'
        }),
        content: [
           {
            columns: [
                {
                    stack: [
                        {
                            text: '10 países con más clientes',	
                            alignment: 'center',
                            margin: [0, 0, 0, 10],
                        },
                        {
                            image: donutChart,
                            width: 300,
                        },
                    ]
                },
                {
                    layout: 'lightHorizontalLines',
                    width: 'auto',
                    table: {
                        headerRows: 1,
                        widths: [100, 'auto'],
                        body: [
                            ['País', 'Clientes'],
                            ...options.topCountries.map((c) => [c.country, c.customers])
                        ]
                    }
                },
            ],
           },
           {
            image: lineChart,
            width: 500,
           },
           {
            columnGap: 10,
                columns: [
                {
                    image: barChart1,
                    width: 250,
                },
                {
                    image: barChart2,
                    width: 250,
                },
                ],
            },
        ],
        footer: footerSection,
      };

    return docDefinition;

}