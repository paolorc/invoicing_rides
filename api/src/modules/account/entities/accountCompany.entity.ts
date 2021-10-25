import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Account } from './account.entity';

@Entity('account_companies')
export class AccountCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (a) => a.accountCompanies)
  account: Account;

  @Column()
  name: string;

  @Column()
  taxpayerNumber: string;

  @Column()
  createdAt: Date;

  @Exclude()
  @Column()
  updatedAt: Date;
}
