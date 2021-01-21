import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  createdUpdatedAtColumn,
  primaryGeneratedColumn,
} from './utils/defaultColumns';

export default class CreateTriggers1611182314677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'triggers',
        columns: [
          primaryGeneratedColumn,
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'color',
            type: 'varchar',
          },
          createdUpdatedAtColumn('created_at'),
          createdUpdatedAtColumn('updated_at'),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('triggers');
  }
}
