import { Account } from 'modules/account/entities/account.entity';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

import { initialAccounts } from 'seeds/accounts';

export class SeedAccounts1635055339040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(initialAccounts)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
