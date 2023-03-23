import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
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
import { DeletePortfolioDto } from './dtos/delete-portfolio.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard';
import { FeedApiResponseDto } from './dtos/swagger/feed.api-response.dto';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { CreatePortfolioApiResponseDto } from './dtos/swagger/create-portfolio.api-response.dto';
import { UserInRequest } from '../auth/types/user-in-request.type';

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
    @Req() { user }: UserInRequest
  ): Promise<CreatePortfolioApiResponseDto> {
    return this.portfolioService.create(user.userId, body);
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
  getAll(): Promise<FeedApiResponseDto[]> {
    return this.portfolioService.getAllWithImages();
  }
}
