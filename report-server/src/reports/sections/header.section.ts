import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}


interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

const currentDate: Content = {
    text: DateFormater.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [20,30],
    width: 150,
}

export const headerSection = ( options: HeaderOptions): Content => {

    const { title, subTitle, showLogo = true, showDate = true } = options;

    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ?  currentDate : null;
    const headerTitle: Content = title ? 
        { 
            stack: [
                { text: title, style: 'header' },
                subTitle ? { text: subTitle, style: 'subheader' } : null
            ]
        } 
        : null;
    
    return {
        columns: [ 
            headerLogo,
            headerTitle,
            headerDate 
        ]
    }
}