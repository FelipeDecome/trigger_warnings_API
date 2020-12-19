import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserEmailVerifiedColumn1608333359371
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email_verified',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email_verified');
  }
}
