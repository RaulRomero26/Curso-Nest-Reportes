import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { orderByIdReport } from '../reports/order-by-id.report';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit{

    async onModuleInit() {
        await this.$connect();
        console.log('Connected to the database');
    }
  
    constructor(
    private readonly printerService: PrinterService
    ) {
    super();
    }

    async getOrderByIdReport(orderId: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true
                    }
                }
            }
        });
        
        if(!order){
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }


        console.log(JSON.stringify(order, null, 2));

        const docDefinition = orderByIdReport({
            data: order as any
        });
    
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }
  
}
