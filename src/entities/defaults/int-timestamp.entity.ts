import { PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestemp.entity';

export class IntTimestampEntity extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;
}
