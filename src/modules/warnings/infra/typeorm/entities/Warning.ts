import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Media from './Media';
import SensitiveContent from './SensitiveContent';

@Entity('warnings')
export default class Warning {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  description: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(_type => User)
  user: User;

  @Column('uuid')
  media_id: string;

  @ManyToOne(_type => Media, user => user.warnings)
  media: Media;

  @ManyToMany(_type => SensitiveContent)
  sensitive_contents: SensitiveContent[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
