import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { arrayPaginate, PaginatedDTO, Pagination } from 'lib/pagination';
import { readFileStream } from 'lib/csv';

import { formatMapper } from './utils/csvMapper';
import { RidesDTO } from './types/dto/rides.dto';

import AppLog from 'logger/logger.service';
import { RideStatus } from './types/enum/rideStatus';
import { Account } from 'modules/account/entities/account.entity';
import { AccountRoles } from 'modules/account/types/enum/roles';

@Injectable()
export class RideService {
  private allRides: IRide[] = [];
  private rideCsvPath = join('test-data', 'rides.csv');

  constructor(
    private readonly configService: ConfigService,
    private log: AppLog,
  ) {
    this.log.setContext(RideService.name);
    this.rideCsvPath = this.configService.get<string>('csv.rides_path');

    const process = (results: any[]) => {
      this.allRides = results;
      this.log.debug(`Populating rides finished!`);
    };

    this.loadRidesFromCSV(process);
  }

  private async loadRidesFromCSV(processFunc: (input: any[]) => void) {
    const delimiter = ';';

    if (this.allRides.length <= 0) {
      this.log.debug(`Populating rides!`);

      readFileStream(this.rideCsvPath, delimiter, formatMapper, processFunc);
    }
  }

  findAll(account: Account, params: RidesDTO) {
    const { page, limit, passengerId } = params;

    if (account.role === AccountRoles.Passenger) {
      return this.findAllByAccount(account, params);
    }

    let rows = [...this.allRides];

    if (passengerId) {
      rows = this.filterByPassenger(rows, passengerId);
    }

    rows = arrayPaginate(rows, limit, page);

    return new Pagination<IRide>(rows, rows.length, page, limit);
  }

  findAllByAccount(account: Account, params: RidesDTO) {
    const { page, limit } = params;

    const rows = this.filterByPassenger(this.allRides, account.id);
    const rowsToShow = arrayPaginate(rows, limit, page);

    return new Pagination<IRide>(rowsToShow, rowsToShow.length, page, limit);
  }

  findById(id: string): IRide {
    return this.allRides.find((ride) => ride.id === id);
  }

  private filterByPassenger(rides: IRide[], passengerId: number) {
    return rides.filter((ride) => ride.passengerId == passengerId);
  }

  findCompletedByIds(ids: string[]) {
    return this.allRides.filter(
      (ride) => ids.includes(ride.id) && ride.status === RideStatus.Completed,
    );
  }
}
