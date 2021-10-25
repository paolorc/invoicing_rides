import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';

import { PaginatedDTO } from 'lib/pagination';
import { RideService } from './ride.service';
import { RidesDTO } from './types/dto/rides.dto';

@Controller('rides')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  findAll(@Query() params: RidesDTO) {
    return this.rideService.findAll(params);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:rideId')
  findByIds(@Param('rideId') rideId: string) {
    return this.rideService.findById(rideId);
  }
}
