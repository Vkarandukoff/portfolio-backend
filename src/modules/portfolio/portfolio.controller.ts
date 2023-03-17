import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioService } from './services/portfolio.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { Request } from 'express';
import { DeletePortfolioDto } from './dtos/delete-portfolio.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(public portfolioService: PortfolioService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'should create new user portfolio' })
  @Post('create')
  create(@Body() body: CreatePortfolioDto, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.portfolioService.create(userId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'should delete portfolio' })
  @Delete('delete')
  delete(@Query() { id }: DeletePortfolioDto) {
    return this.portfolioService.deleteById(id);
  }

  @ApiOperation({ summary: 'should return all portfolios' })
  @Get('feed')
  getAll() {
    return this.portfolioService.getAllWithImages();
  }
}
