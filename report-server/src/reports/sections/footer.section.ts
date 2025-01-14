import { Content } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number) : Content => {
    return {
        text: `Page ${currentPage} de ${pageCount}`,
        alignment: 'right',
        bold: true,
        margin: [0, 20, 20, 0],
        fontSize: 10
    }
}