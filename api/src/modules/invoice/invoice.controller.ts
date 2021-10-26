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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { Account } from 'modules/account/entities/account.entity';
import { AccountRoles } from 'modules/account/types/enum/roles';
import { Auth } from 'modules/account/decorators/auth.decorator';
import { JwtAuthGuard } from 'modules/account/guards/jwtAuth.guard';
import { Roles } from 'modules/account/decorators/roles.decorator';
import { RolesGuard } from 'modules/account/guards/roles.guard';

import { InvoiceService } from './invoice.service';
import { InvoicesDTO } from './types/dto/invoices.dto';
import { NewInvoiceDTO } from './types/dto/newInvoice.dto';

@Controller('invoices')
@Roles(AccountRoles.Admin, AccountRoles.Passenger)
@UseInterceptors(ClassSerializerInterceptor)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Auth() account: Account, @Body() data: NewInvoiceDTO) {
    return this.invoiceService.create(account, data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  findAll(@Auth() account: Account, @Query() params: InvoicesDTO) {
    return this.invoiceService.findAll(account, params);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(AccountRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:invoiceId')
  findOne(@Param('invoiceId') invoiceId: number) {
    return this.invoiceService.findOne(invoiceId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(AccountRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/csv')
  async createCSV(@Response() res: ExpressResponse) {
    const invoiceCSV = await this.invoiceService.makeCSV();

    res.header('Content-disposition', 'attachment; filename=invoices.csv');
    res.header('Content-Type', 'text/csv');
    return res.send(invoiceCSV);
  }
}
