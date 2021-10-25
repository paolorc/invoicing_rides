import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Account } from 'modules/account/entities/account.entity';
import { Invoice } from './invoice.entity';
import { InvoiceHistoryStatus } from '../types/enum/historyStatus';

@Entity('invoice_history')
export class InvoiceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (i) => i.invoiceHistory)
  invoice: Invoice;

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
}
