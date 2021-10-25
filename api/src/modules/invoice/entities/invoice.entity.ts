import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Account } from 'modules/account/entities/account.entity';
import { InvoiceHistoryStatus } from '../types/enum/historyStatus';
import { InvoiceHistory } from './invoiceHistory.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (a) => a.invoices)
  account: Account;

  @Column()
  companyName: string;

  @Column()
  companyTaxpayerNumber: string;

  @Column()
  driverTaxPayerNumber: string;

  @Column()
  rideId: string;

  @Column()
  rideDate: Date;

  @Column()
  pickUp: string;

  @Column()
  dropOff: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: InvoiceHistoryStatus,
    default: InvoiceHistoryStatus.Created,
  })
  status: InvoiceHistoryStatus;

  @Column()
  createdAt: Date;

  @Exclude()
  @Column()
  updatedAt: Date;

  @OneToMany(() => InvoiceHistory, (ih) => ih.invoice)
  invoiceHistory: InvoiceHistory[];
}
