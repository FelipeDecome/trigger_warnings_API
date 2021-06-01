import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  createdUpdatedAtColumn,
  primaryGeneratedColumn,
} from './utils/defaultColumns';

export default class CreateMedias1611182321673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medias',
        columns: [
          primaryGeneratedColumn,
          {
            name: 'tmdb_id',
            type: 'integer',
            isUnique: true,
          },
          createdUpdatedAtColumn('created_at'),
          createdUpdatedAtColumn('updated_at'),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medias');
  }
}
