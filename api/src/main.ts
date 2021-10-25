import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import AppModule from './app.module';
import Logger from 'logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService = app.get(ConfigService);

  app.useLogger(await app.resolve(Logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(configService.get<string>('http.prefix'));

  await app.listen(
    configService.get<number>('http.port'),
    configService.get<string>('http.host'),
  );
  Logger.debug(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
