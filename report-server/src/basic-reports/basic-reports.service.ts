import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PDFPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
      console.log('Connected to the database');
    }


    async hello() {
       const printer = new PDFPrinter(fonts);

        const docDefinition: TDocumentDefinitions = {
          content: ['Hola Mundo!'],
        };

       const doc = printer.createPdfKitDocument(docDefinition);
       return doc;
    }
}
