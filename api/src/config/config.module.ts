import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

import csvConfig from './services/csv';
import httpConfig from './services/http';
import jwtConfig from './services/jwt';
import mariadbConfig from './services/mariadb';

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [csvConfig, httpConfig, jwtConfig, mariadbConfig],
      isGlobal: true,
    }),
  ],
})
export default class ConfigModule {}
