import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountRoles } from 'modules/account/types/enum/roles';
import { JwtAuthGuard } from 'modules/account/guards/jwtAuth.guard';
import { Roles } from 'modules/account/decorators/roles.decorator';
import { RolesGuard } from 'modules/account/guards/roles.guard';

import { RideService } from './ride.service';
import { RidesDTO } from './types/dto/rides.dto';
import { Auth } from 'modules/account/decorators/auth.decorator';
import { Account } from 'modules/account/entities/account.entity';

@Controller('rides')
@Roles(AccountRoles.Admin, AccountRoles.Passenger)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  findAll(@Auth() account: Account, @Query() params: RidesDTO) {
    return this.rideService.findAll(account, params);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:rideId')
  findByIds(@Param('rideId') rideId: string) {
    return this.rideService.findById(rideId);
  }
}
