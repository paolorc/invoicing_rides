import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from 'modules/account/account.module';
import { DriverModule } from 'modules/driver/drive.module';
import { InvoiceModule } from 'modules/invoice/invoice.module';
import { RideModule } from 'modules/ride/ride.module';

import ConfigModule from 'config/config.module';
import LoggerModule from 'logger/logger.module';

@Module({
  imports: [
    // global configuration of the typeorm module, using factory func.
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<MysqlConnectionCredentialsOptions>('mariadb'),
        type: 'mariadb',
        autoLoadEntities: true,
        synchronize: false,
        entities: ['dist/**/*.entity{.ts, .js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        debug: false,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    ConfigModule,
    DriverModule,
    InvoiceModule,
    LoggerModule,
    RideModule,
  ],
})
export default class AppModule {}
