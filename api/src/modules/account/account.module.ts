import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountCompany } from './entities/accountCompany.entity';

import { PassengerService } from './passenger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountCompany])],
  // controllers: [AppController],
  providers: [PassengerService],
  exports: [TypeOrmModule],
})
export class AccountModule {}
