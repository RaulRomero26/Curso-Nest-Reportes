import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport, getEmploymentLetterByIdReport,getCountryReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
      console.log('Connected to the database');
    }

    constructor(
      private readonly printerService: PrinterService
    ) {
      super();
    }


    async hello() {

      const docDefinition = getHelloWorldReport({
        name: 'Raul'
      });

       const doc = this.printerService.createPdf(docDefinition);
       return doc;
    }

    async employmentLetter() {
      const docDefinition = getEmploymentLetterReport();

       const doc = this.printerService.createPdf(docDefinition);
       return doc;
    }

    async employmentLetterById(employeeId: number) {
    
      const employee = []
      // const employee = await this.employees.findUnique({
      //   where: {
      //     id: employeeId
      //   }
      // })

      if(!employee){
        throw new NotFoundException(`Employee with id ${employeeId} not found`)
      }
      console.log(employee);
      const docDefinition = getEmploymentLetterByIdReport({
        employerName: 'Angel Perez Flores',
        employerPosition: 'Jefe del Departamento de Informacion',
        employeeName: 'Raul Romero Dardon',
        employeePosition:  'Analista A',
        employeeStartDate: new Date('01-03-2021'),
        employeeHours: 12,
        employeeWorkSchedule: 'L-V 8 a 18 hrs',
        employerCompany: 'Secretaria de Seguridad Ciudadana'
      });
       const doc = this.printerService.createPdf(docDefinition);
       return doc;
    }

    async getCountries() {
      const countries = await this.countries.findMany({
        where: {
          local_name: {
            not: null,
          },
        },
      });
  
      const docDefinition = getCountryReport({ countries });
  
      return this.printerService.createPdf(docDefinition);
    }
}
