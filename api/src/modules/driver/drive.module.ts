import { Module } from '@nestjs/common';

import { DriverService } from './driver.service';

@Module({
  imports: [],
  // controllers: [AppController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
