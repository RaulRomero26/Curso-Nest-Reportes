import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello ( @Res() res: Response) {
    const pdfDoc = await this.basicReportsService.hello();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter ( @Res() res: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById ( @Res() res: Response, @Param('employeeId') employeeId: string) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+employeeId);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

}
