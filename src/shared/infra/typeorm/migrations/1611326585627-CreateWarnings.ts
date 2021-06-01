import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  createdUpdatedAtColumn,
  primaryGeneratedColumn,
} from './utils/defaultColumns';

export default class CreateWarnings1611326585627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'warnings',
        columns: [
          primaryGeneratedColumn,
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'media_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          createdUpdatedAtColumn('created_at'),
          createdUpdatedAtColumn('updated_at'),
        ],
        foreignKeys: [
          {
            name: 'warningsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'warningsMedia',
            columnNames: ['media_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'medias',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('warnings');
  }
}
