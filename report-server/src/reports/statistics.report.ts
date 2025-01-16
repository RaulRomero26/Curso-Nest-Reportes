import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from "src/helpers/chart-utils";
import { chartJsToImage } from '../helpers/chart-utils';
import { getDonutChart } from './charts/donut.chart';


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

    const donutChart = await getDonutChart({
        entries: options.topCountries.map((c) => ({
            label: c.country,
            value: c.customers
        })),
        position: 'left'
    });

    const docDefinition: TDocumentDefinitions = {
        content: [
            {
                image: donutChart,
                width: 500,
            }
        ],
      };

    return docDefinition;

}