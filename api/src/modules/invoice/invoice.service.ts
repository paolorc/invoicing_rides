import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, getManager, Repository } from 'typeorm';

import { Account } from 'modules/account/entities/account.entity';
import { AccountCompany } from 'modules/account/entities/accountCompany.entity';
import { DriverService } from 'modules/driver/driver.service';
import { NewInvoiceDTO } from './types/dto/newInvoice.dto';
import { RideService } from 'modules/ride/ride.service';

import { Invoice } from './entities/invoice.entity';
import { InvoiceHistory } from './entities/invoiceHistory.entity';
import { InvoiceHistoryStatus } from './types/enum/historyStatus';

import AppLog from 'logger/logger.service';
import { InvoicesDTO } from './types/dto/invoices.dto';
import { Pagination } from 'lib/pagination';
import { json2csvAsync } from 'json-2-csv';
import { AccountRoles } from 'modules/account/types/enum/roles';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(AccountCompany)
    private readonly accountCompanyRepo: Repository<AccountCompany>,
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceHistory)
    private readonly invoiceHistoryRepo: Repository<InvoiceHistory>,
    private log: AppLog,
    private readonly driverService: DriverService,
    private readonly rideService: RideService,
  ) {
    this.log.setContext(InvoiceService.name);
  }

  async create(account: Account, data: NewInvoiceDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      let invoices: Invoice[];

      await queryRunner.manager.transaction(async (em) => {
        // first find if the company already exists by user
        let company = await this.accountCompanyRepo.findOne({
          taxpayerNumber: data.taxpayerNumber,
          account,
        });

        if (!company) {
          const newCompany = new AccountCompany();
          newCompany.account = account;
          newCompany.name = data.companyName;
          newCompany.taxpayerNumber = data.taxpayerNumber;

          company = await em.save(AccountCompany, newCompany);
        }

        const uniqueRidesId = [...new Set(data.ridesId)];

        // validate all rides exists and were not cancelled
        const rides = this.rideService.findCompletedByIds(uniqueRidesId);

        // validate all rides requested were completed
        if (rides.length !== uniqueRidesId.length) {
          return 'There are few rides that should not be processed, please review the rides selected and try again.';
        }

        const pendingPromises = rides.map((ride) => {
          return this.generate(company, account, ride, em);
        });

        invoices = await Promise.all(pendingPromises);

        em.queryRunner.commitTransaction();
      });

      return invoices;
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async generate(
    company: AccountCompany,
    account: Account,
    ride: IRide,
    em: EntityManager = getManager(),
  ) {
    const driver = this.driverService.findById(ride.driverId);

    const newInvoice = new Invoice();
    newInvoice.account = account;
    newInvoice.companyName = company.name;
    newInvoice.companyTaxpayerNumber = company.taxpayerNumber;
    newInvoice.driverTaxPayerNumber = driver.taxPayerNumber;
    newInvoice.pickUp = ride.pickupAddress;
    newInvoice.dropOff = ride.dropoffAddress;
    newInvoice.rideId = ride.id;
    newInvoice.rideDate = new Date(ride.date);
    newInvoice.amount = ride.amount;
    newInvoice.status = InvoiceHistoryStatus.Created;

    await em.save(newInvoice);
    await this.newHistory(newInvoice, newInvoice.status, em);

    return newInvoice;
  }

  async updateStatus(
    invoiceId: number,
    newStatus: InvoiceHistoryStatus,
    em: EntityManager = getManager(),
  ) {
    const invoice = await this.findOne(invoiceId);

    if (!invoice) {
      return 'not a valid invoice.';
    }

    invoice.status = newStatus;

    await em.save(invoice);
    await this.newHistory(invoice, newStatus, em);

    return invoice;
  }

  newHistory(
    invoice: Invoice,
    status: InvoiceHistoryStatus,
    em: EntityManager,
  ) {
    const history = new InvoiceHistory();
    history.invoice = invoice;
    history.status = status;

    return em.save(history);
  }

  async findAll(account: Account, params: InvoicesDTO) {
    const { page, limit } = params;

    const accountFilter =
      account.role === AccountRoles.Passenger ? { where: { account } } : {};

    const [invoices, count] = await this.invoiceRepo.findAndCount({
      ...accountFilter,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return new Pagination<Invoice>(invoices, count, page, limit);
  }

  findOne(id: number) {
    return this.invoiceRepo.findOne(id);
  }

  async makeCSV() {
    const delimiter = ';';
    // will get all the created invoices
    const invoices = await this.invoiceRepo
      .createQueryBuilder('invoice')
      .innerJoin('invoice.account', 'account')
      .select([
        'invoice.id',
        'account.email',
        'invoice.companyName',
        'invoice.companyTaxpayerNumber',
        'invoice.driverTaxPayerNumber',
        'invoice.rideId',
        'invoice.rideDate',
        'invoice.pickUp',
        'invoice.dropOff',
        'invoice.amount',
        'invoice.status',
      ])
      .getMany();

    return json2csvAsync(invoices, { delimiter: { field: delimiter } });
  }
}
