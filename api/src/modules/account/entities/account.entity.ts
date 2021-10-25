import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { AccountRoles } from '../types/enum/roles';
import { AccountStatus } from '../types/enum/status';
import { AccountCompany } from './accountCompany.entity';
import { Invoice } from 'modules/invoice/entities/invoice.entity';
import { InvoiceHistory } from 'modules/invoice/entities/invoiceHistory.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: AccountRoles, default: AccountRoles.Passenger })
  role: AccountRoles;

  @Exclude()
  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.Active })
  status: AccountStatus;

  @Exclude()
  @Column()
  createdAt: Date;

  @Exclude()
  @Column()
  updatedAt: Date;

  @OneToMany(() => AccountCompany, (ac) => ac.account)
  accountCompanies?: AccountCompany[];

  @OneToMany(() => Invoice, (i) => i.account)
  invoices?: Invoice[];
}
