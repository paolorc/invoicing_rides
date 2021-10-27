import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { Auth } from './decorators/auth.decorator';
import { AccountRoles } from './types/enum/roles';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/login')
  login(@Body() credentials: { email: string; password: string }) {
    return this.accountService.login(credentials.email, credentials.password);
  }

  @Roles(AccountRoles.Admin, AccountRoles.Passenger)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/me')
  me(@Auth() account: Account) {
    return account;
  }
}
