import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TimestampDto {
  @ApiProperty({
    example: '2022-12-22 00:00:00.000',
    description: 'timestamp row when created',
    type: Date,
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-22 00:00:01.000',
    description: 'timestamp row when updated',
    type: Date,
  })
  @IsDateString()
  updatedAt: Date;
}
