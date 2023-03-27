import { IntTimestampDto } from './defaults/int-timestamp.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';
import { ImageDto } from './image.dto';

export class PortfolioDto extends IntTimestampDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: UserDto,
  })
  createdBy: UserDto;

  @ApiProperty({
    type: ImageDto,
    isArray: true,
  })
  images: ImageDto[];
}
