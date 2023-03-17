import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ImageModule } from './modules/image/image.module';

import * as Entities from './entities/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: 'postgres',
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
