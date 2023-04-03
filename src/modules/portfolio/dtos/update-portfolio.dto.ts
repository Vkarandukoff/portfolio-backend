import { ApiProperty, PickType } from '@nestjs/swagger';
import { PortfolioDto } from '@src/dtos/portfolio.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePortfolioDto extends PickType(PortfolioDto, ['description']) {
  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;
}
