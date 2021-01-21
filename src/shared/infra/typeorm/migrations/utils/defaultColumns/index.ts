import { TableColumn } from 'typeorm';

export const primaryGeneratedColumn = new TableColumn({
  name: 'id',
  type: 'uuid',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
});

export const createdUpdatedAtColumn = (name: string): TableColumn =>
  new TableColumn({
    name,
    type: 'timestamp',
    default: 'now()',
  });
