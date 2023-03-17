import { IntTimestampDto } from './defaults/int-timestamp.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ImageDto } from './image.dto';
import { PortfolioDto } from './portfolio.dto';

export class UserDto extends IntTimestampDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken: string | null;

  @ApiProperty({
    type: ImageDto,
    isArray: true,
  })
  images: ImageDto[];

  @ApiProperty({
    type: PortfolioDto,
    isArray: true,
  })
  portfolios: PortfolioDto[];
}
