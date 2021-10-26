import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './entities/account.entity';
import { IJWTPayload } from './types/interface/jwtPayload';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // TODO: Implement real validation by encryption of password and hashing
    const account = await this.findByEmail(email);

    if (account.password !== password) {
      throw new Error('Invalid Account');
    }

    return {
      account: {
        id: account.id,
        name: account.name,
        lastName: account.lastName,
        email: account.email,
        role: account.role,
      },
      accessToken: this.generateAccessToken(account),
    };
  }

  generateAccessToken(account: Account) {
    const payload: IJWTPayload = { email: account.email, role: account.role };

    return this.jwtService.sign(payload);
  }

  validate() {}

  async findByEmail(email: string) {
    const account = await this.accountRepo.findOne({ email });

    if (!account) {
      throw new Error('Invalid Account');
    }

    return account;
  }
}
