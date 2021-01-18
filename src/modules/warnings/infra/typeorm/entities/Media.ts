import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Warning from './Warning';

@Entity('medias')
export default class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  tmdb_id: number;

  @Column()
  original_title: string;

  @Column('text')
  synopsis: string;

  @OneToMany(_type => Warning, warning => warning.media, { eager: true })
  warnings: Warning[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
