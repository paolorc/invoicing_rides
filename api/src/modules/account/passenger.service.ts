import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { readFileStream } from 'lib/csv';

import { Account } from './entities/account.entity';
import { formatMapper } from './utils/csvMapper';

import AppLog from 'logger/logger.service';

@Injectable()
export class PassengerService {
  private allPassengers = [];
  private passengerCsvPath: string;

  constructor(
    private readonly configService: ConfigService,
    private log: AppLog,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {
    this.log.setContext(PassengerService.name);
    this.passengerCsvPath = this.configService.get<string>(
      'csv.passengers_path',
    );

    const process = (results: any[]) => {
      this.allPassengers = results;
      this.log.debug(`Populating passengers finished!`);
    };

    this.loadPassengersFromCSV(process);
  }

  async loadPassengersFromCSV(processFunc: (input: any[]) => void) {
    const delimiter = ';';

    if (this.allPassengers.length <= 0) {
      this.log.debug(`Populating passengers!`);

      readFileStream(
        this.passengerCsvPath,
        delimiter,
        formatMapper,
        processFunc,
      );
    }
  }
}
