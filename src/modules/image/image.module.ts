import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './services/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image, Portfolio } from '@src/entities';
import { PortfolioService } from '../portfolio/services/portfolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Portfolio])],
  controllers: [ImageController],
  providers: [ImageService, PortfolioService],
})
export class ImageModule {}
