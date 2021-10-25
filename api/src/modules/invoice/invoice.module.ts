import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'modules/account/account.module';
import { DriverModule } from 'modules/driver/drive.module';
import { RideModule } from 'modules/ride/ride.module';

import { Invoice } from './entities/invoice.entity';
import { InvoiceHistory } from './entities/invoiceHistory.entity';

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, InvoiceHistory]),
    AccountModule,
    DriverModule,
    RideModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, TypeOrmModule],
})
export class InvoiceModule {}
