import { PickType } from '@nestjs/swagger';
import { PortfolioDto } from '@src/dtos/portfolio.dto';

export class CreatePortfolioApiResponseDto extends PickType(PortfolioDto, [
  'id',
  'name',
  'description',
  'createdAt',
]) {}
