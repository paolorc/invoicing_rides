import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Account } from './entities/account.entity';
import { AccountCompany } from './entities/accountCompany.entity';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { PassengerService } from './passenger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountCompany]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<JwtModuleOptions>('jwt'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, PassengerService, JWTStrategy],
  exports: [TypeOrmModule],
})
export class AccountModule {}
