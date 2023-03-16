import { IntTimestampEntity } from './defaults/int-timestamp.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { User } from './user.entity';

@Entity('image')
export class Image extends IntTimestampEntity {
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

  @Column({
    name: 'comments',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  comments: string;

  @ManyToOne(() => User, ({ images }) => images)
  @JoinColumn({
    name: 'uploaded_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'image_user_id_fk',
  })
  uploadedBy: User;

  @ManyToOne(() => Portfolio, ({ images }) => images)
  @JoinColumn({
    name: 'portfolio_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'image_portfolio_id_fk',
  })
  portfolio: Portfolio;
}
