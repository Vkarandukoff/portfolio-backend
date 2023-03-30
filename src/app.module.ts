import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ImageModule } from './modules/image/image.module';
import * as Entities from './entities/index';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('RDS_HOSTNAME'),
      port: +configService.get('RDS_PORT'),
      username: configService.get('RDS_USERNAME'),
      password: configService.get('RDS_PASSWORD'),
      database: configService.get('RDS_DB_NAME'),
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
