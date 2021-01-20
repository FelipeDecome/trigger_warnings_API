import { TableColumn } from 'typeorm';

const primaryGeneratedColumn = new TableColumn({
  name: 'id',
  type: 'uuid',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
});

const createdUpdatedAtColumn = (name: string): TableColumn =>
  new TableColumn({
    name,
    type: 'timestamp',
    default: 'now()',
  });

export default {
  primaryGeneratedColumn,
  createdUpdatedAtColumn,
};
