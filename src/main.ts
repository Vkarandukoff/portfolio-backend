import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

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
