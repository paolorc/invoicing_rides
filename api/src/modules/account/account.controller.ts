import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AccountService } from './account.service';
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/login')
  login(@Body() credentials: { email: string; password: string }) {
    return this.accountService.login(credentials.email, credentials.password);
  }
}
