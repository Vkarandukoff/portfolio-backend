import { ApiProperty, PickType } from '@nestjs/swagger';
import { ImageDto } from '@src/dtos/image.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadImageDto extends PickType(ImageDto, ['name', 'description', 'comments']) {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  @Type(() => Number)
  portfolioId: number;
}
