import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { InvoiceHistoryStatus } from 'modules/invoice/types/enum/historyStatus';

const tableName = 'invoices';

export class invoicesTable1635025571364 implements MigrationInterface {
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
            name: 'accountId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'companyName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'companyTaxpayerNumber',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'driverTaxPayerNumber',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'rideId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'rideDate',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'pickUp',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dropOff',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'double(10,2)',
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
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['accountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('accountId') !== -1,
    );

    await queryRunner.dropForeignKey(tableName, foreignKey);
    await queryRunner.dropTable(tableName);
  }
}
