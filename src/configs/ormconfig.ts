import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as Entities from '../entities';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('RDS_HOSTNAME'),
  port: +configService.get('RDS_PORT'),
  username: configService.get('RDS_USERNAME'),
  password: configService.get('RDS_PASSWORD'),
  database: configService.get('RDS_DB_NAME'),
  entities: Object.values(Entities),
  migrationsTableName: 'migrations_table',
  migrations: ['src/migrations/*.{ts,js}'],
  logging: false,
  synchronize: false,
});
