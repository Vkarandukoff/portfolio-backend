import { Column, Entity, OneToMany } from 'typeorm';
import { IntTimestampEntity } from './defaults/int-timestamp.entity';
import { Image } from './image.entity';
import { Portfolio } from './portfolio.entity';

@Entity('user')
export class User extends IntTimestampEntity {
  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
  })
  refreshToken: string;

  @Column({
    name: 'provider',
    type: 'varchar',
    nullable: true,
  })
  provider: string;

  @Column({
    name: 'picture_url',
    type: 'varchar',
    nullable: true,
  })
  pictureUrl: string;

  @OneToMany(() => Image, ({ uploadedBy }) => uploadedBy)
  images: Image[];

  @OneToMany(() => Portfolio, ({ createdBy }) => createdBy)
  portfolios: Portfolio[];
}
