import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

console.log('Hello ');

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = await app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('portfolio-backend')
    .setDescription('REST API for a portfolio publication site')
    .setVersion('1.3.3.7')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(+configService.get('APP_PORT') || 3000);
}

bootstrap().catch(Logger.error);
