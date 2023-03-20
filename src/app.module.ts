import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ImageModule } from './modules/image/image.module';
import { config } from 'dotenv';
import * as Entities from './entities/index';

config();
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
