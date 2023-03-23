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
    type: ImageDto,
    isArray: true,
  })
  images: ImageDto[];

  @ApiProperty({
    type: PortfolioDto,
    isArray: true,
  })
  portfolios: PortfolioDto[];

  @ApiProperty({
    name: 'refresh_token',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  refreshToken: string;

  @ApiProperty({
    name: 'provider',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  provider: string;

  @ApiProperty({
    name: 'picture_url',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  pictureUrl: string;
}
