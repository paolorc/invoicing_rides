import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { readFileStream } from 'lib/csv';

import { formatMapper } from './utils/csvMapper';

import AppLog from 'logger/logger.service';

@Injectable()
export class DriverService {
  private allDrivers: IDriver[] = [];
  private driveCsvPath: string;

  constructor(
    private readonly configService: ConfigService,
    private log: AppLog,
  ) {
    this.log.setContext(DriverService.name);
    this.driveCsvPath = this.configService.get<string>('csv.drivers_path');

    const process = (results: any[]) => {
      this.allDrivers = results;

      this.log.debug(`Populating drivers finished!`);
    };

    this.loadDriversFromCSV(process);
  }

  async loadDriversFromCSV(processFunc: (input: any[]) => void) {
    const delimiter = ';';

    if (this.allDrivers.length <= 0) {
      this.log.debug(`Populating drivers!`);

      readFileStream(this.driveCsvPath, delimiter, formatMapper, processFunc);
    }
  }

  async findAll() {
    return this.allDrivers;
  }

  findById(id: number): IDriver {
    return this.allDrivers.find((driver) => driver.id === id);
  }
}
