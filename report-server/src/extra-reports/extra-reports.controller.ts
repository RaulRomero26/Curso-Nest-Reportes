import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response){
    const pdfDoc = this.extraReportsService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'HTML Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  
  }

  @Get('community-report')
  async getCommunityReport(@Res() response){
    const pdfDoc = this.extraReportsService.getCommunity();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Community Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  
  }

  @Get('custom-size')
  async getCustomSize(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom-Size';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
