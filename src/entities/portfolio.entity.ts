import { IntTimestampEntity } from './defaults/int-timestamp.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity('portfolio')
export class Portfolio extends IntTimestampEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User, ({ portfolios }) => portfolios)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'portfolio_user_id_fk',
  })
  createdBy: User;

  @OneToMany(() => Image, ({ portfolio }) => portfolio)
  images: Image[];
}
