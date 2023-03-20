import { IntTimestampDto } from './defaults/int-timestamp.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PortfolioDto } from './portfolio.dto';

export class ImageDto extends IntTimestampDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  comments: string | null;

  @ApiProperty({
    type: UserDto,
  })
  uploadedBy: UserDto;

  @ApiProperty({
    type: PortfolioDto,
  })
  portfolio: PortfolioDto;
}
