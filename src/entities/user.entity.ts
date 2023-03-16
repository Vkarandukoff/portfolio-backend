import { Column, Entity } from 'typeorm';
import { IntTimestampEntity } from './defaults/int-timestamp.entity';

@Entity('user')
export class UserEntity extends IntTimestampEntity {
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
    nullable: false,
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
  })
  refreshToken: string;
}
