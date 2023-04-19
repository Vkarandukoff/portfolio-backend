import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as Entities from '../entities';

config({
  path: '.env.development',
});

const configService = new ConfigService();

export const DbSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: Object.values(Entities),
  migrationsTableName: 'migrations_table',
  migrations: ['src/migrations/*.{ts,js}'],
});
