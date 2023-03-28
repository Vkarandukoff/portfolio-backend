import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './services/portfolio.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { DeletePortfolioDto } from './dtos/delete-portfolio.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard';
import { FeedApiResponseDto, PortfolioWithImagesDto } from './dtos/swagger/feed.api-response.dto';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { CreatePortfolioApiResponseDto } from './dtos/swagger/create-portfolio.api-response.dto';
import { UserInRequest } from '../auth/types/user-in-request.type';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';

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

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Put('update')
  @ApiOperation({ summary: 'should partially update portfolio' })
  update(
    @Param('id') id: number,
    @Body() body: UpdatePortfolioDto
  ): Promise<SuccessApiResponseDto> {
    return this.portfolioService.update(id, body);
  }

  @ApiResponse({
    type: FeedApiResponseDto,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'should return all portfolios with images',
  })
  @Get('feed')
  getAll(): Promise<FeedApiResponseDto[]> {
    return this.portfolioService.getAllWithImages();
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiResponse({
    type: PortfolioWithImagesDto,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('all')
  @ApiOperation({ summary: 'should return all users portfolios for one user' })
  getUsersPortfolios(@Req() { user }: UserInRequest): Promise<PortfolioWithImagesDto[]> {
    return this.portfolioService.getUsersPortfolios(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiResponse({
    type: FeedApiResponseDto,
    status: HttpStatus.OK,
  })
  @Get('get')
  @ApiOperation({
    summary: 'should return one portfolio with images',
  })
  withImages(@Param('id') id: number): Promise<FeedApiResponseDto> {
    return this.portfolioService.getOneWithImages(id);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiOperation({ summary: 'should delete portfolio' })
  @Delete('delete')
  delete(@Query() { id }: DeletePortfolioDto): Promise<SuccessApiResponseDto> {
    return this.portfolioService.deleteById(id);
  }
}
