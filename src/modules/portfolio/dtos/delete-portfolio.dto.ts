import { PickType } from '@nestjs/swagger';
import { PortfolioDto } from '../../../dtos/portfolio.dto';

export class DeletePortfolioDto extends PickType(PortfolioDto, [
  'id',
]) {}
