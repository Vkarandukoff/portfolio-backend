import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ImageModule } from './modules/image/image.module';
import * as Entities from './entities/index';
import { DataSource } from 'typeorm';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: Object.values(Entities),
        logging: false,
        synchronize: false,
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
