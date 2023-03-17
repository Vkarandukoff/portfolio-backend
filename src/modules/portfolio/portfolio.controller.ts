import {
  Body,
  Controller,
  Delete,
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

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(public portfolioService: PortfolioService) {}

  @ApiOperation({ summary: 'should create new user portfolio' })
  @Post('create')
  create(@Body() body: CreatePortfolioDto, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.portfolioService.create(userId, body);
  }

  @ApiOperation({ summary: 'should delete portfolio' })
  @Delete('delete')
  delete(@Query() { id }: DeletePortfolioDto) {
    return this.portfolioService.deleteById(id);
  }
}
