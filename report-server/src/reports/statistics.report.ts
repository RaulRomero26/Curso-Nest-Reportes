import { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {}

export const getStatisticsReport = (options:ReportOptions) => {


    const docDefinition: TDocumentDefinitions = {
        content: [`Hola mundo report`],
      };

    return docDefinition;

}