import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { InvoiceHistoryStatus } from 'modules/invoice/types/enum/historyStatus';

const tableName = 'invoice_history';

export class invoiceHistoryTable1635025585337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'invoiceId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(InvoiceHistoryStatus),
            default: `'${InvoiceHistoryStatus.Created}'`,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            onUpdate: 'now()',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['invoiceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'invoices',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    const invoiceForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('invoiceId') !== -1,
    );

    await queryRunner.dropForeignKey(tableName, invoiceForeignKey);
    await queryRunner.dropTable(tableName);
  }
}
