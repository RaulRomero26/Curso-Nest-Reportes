import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from '../reports/hello-world.report';

@Injectable()
export class ExtraReportsService {

    constructor(
        private readonly printerService: PrinterService
    ) {}

    getHtmlReport()  {
        const  docDefinition = getHelloWorldReport({
            name: 'Raul Romero'
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }
}
