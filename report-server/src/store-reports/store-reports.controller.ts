import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

    @Get('order/:orderId')
    async getOrderReport(@Param('orderId') orderId: string,@Res() res: Response) {
      const pdfDoc = await this.storeReportsService.getOrderByIdReport(orderId);
      res.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = 'Countries Report';
      pdfDoc.pipe(res);
      pdfDoc.end();
  }
}
