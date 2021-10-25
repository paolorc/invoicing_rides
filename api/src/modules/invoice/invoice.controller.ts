import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { InvoiceService } from './invoice.service';
import { InvoicesDTO } from './types/dto/invoices.dto';
import { NewInvoiceDTO } from './types/dto/newInvoice.dto';

import { json2csvAsync } from 'json-2-csv';

@Controller('invoices')
@UseInterceptors(ClassSerializerInterceptor)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  create(@Body() data: NewInvoiceDTO) {
    return this.invoiceService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  findAll(@Query() params: InvoicesDTO) {
    return this.invoiceService.findAll(params);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:invoiceId')
  findOne(@Param('invoiceId') invoiceId: number) {
    return this.invoiceService.findOne(invoiceId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/csv')
  async makeFile(
    @Response() res: ExpressResponse,
    // @Body() data: { status: string },
  ) {
    const arr = [{ name: 'paolo' }, { name: 'gabriela' }];

    const csv = await json2csvAsync(arr);

    res.header('Content-disposition', 'attachment; filename=invoices.csv');
    res.header('Content-Type', 'text/csv');
    return res.send(csv);
  }
}
