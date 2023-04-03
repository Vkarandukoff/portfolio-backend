import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './services/portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '@src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
