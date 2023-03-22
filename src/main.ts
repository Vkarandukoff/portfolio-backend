import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const redisClient = createClient();
  redisClient.connect().catch(Logger.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sessionID: ',
  });

  app.use(
    session({
      name: 'auth-session',
      secret: configService.get('SESSION_SECRET'),
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('portfolio-backend')
    .setDescription('REST API for a portfolio publication site')
    .setVersion('1.3.3.7')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('portfolio/api', app, document);

  await app.listen(3000);
}

bootstrap().catch(Logger.error);
