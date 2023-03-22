import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioService } from './services/portfolio.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { Request } from 'express';
import { DeletePortfolioDto } from './dtos/delete-portfolio.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard.service';
import { FeedApiResponseDto } from './dtos/swagger/feed.api-response.dto';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { CreatePortfolioApiResponseDto } from './dtos/swagger/create-portfolio.api-response.dto';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(public portfolioService: PortfolioService) {}

  @ApiResponse({
    type: CreatePortfolioApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiOperation({ summary: 'should create new user portfolio' })
  @Post('create')
  create(
    @Body() body: CreatePortfolioDto,
    @Req() req: Request
  ): Promise<CreatePortfolioApiResponseDto> {
    const userId = req.user['userId'];
    return this.portfolioService.create(userId, body);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiOperation({ summary: 'should delete portfolio' })
  @Delete('delete')
  delete(
    @Query() { id }: DeletePortfolioDto
  ): Promise<SuccessApiResponseDto> {
    return this.portfolioService.deleteById(id);
  }

  @ApiResponse({
    type: FeedApiResponseDto,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'should return all portfolios' })
  @Get('feed')
  getAll(
    @Req() req: Request,
    @Session() session: Record<string, any>
  ): Promise<FeedApiResponseDto[]> {
    session.visits = session.visits ? session.visits + 1 : 1;
    // console.log({ id: session.id, visits: session.visits });
    console.log(req);
    return this.portfolioService.getAllWithImages();
  }
}
