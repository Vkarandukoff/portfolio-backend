import { PickType } from '@nestjs/swagger';
import { PortfolioDto } from '@src/dtos/portfolio.dto';

export class DeletePortfolioDto extends PickType(PortfolioDto, ['id']) {}
