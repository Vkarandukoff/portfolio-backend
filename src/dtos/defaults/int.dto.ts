import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IntDto {
  @ApiProperty({
    example: '1',
    description: 'int4',
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  id: number;
}
