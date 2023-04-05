import { PickType } from '@nestjs/swagger';
import { PortfolioDto } from '@src/dtos/portfolio.dto';

export class CreatePortfolioDto extends PickType(PortfolioDto, [
  'name',
  'description',
]) {}
