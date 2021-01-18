import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSensitiveContentsInWarnings1610489226026
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sensitive_contents_in_warnings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sensitive_content_id',
            type: 'uuid',
          },
          {
            name: 'warning_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['sensitive_content_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sensitive_contents',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['warning_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'warnings',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sensitive_contents_in_warnings');
  }
}
