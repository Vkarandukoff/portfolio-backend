import { ApiProperty, PickType } from '@nestjs/swagger';
import { ImageDto } from '../../../../dtos/image.dto';
import { PortfolioDto } from '../../../../dtos/portfolio.dto';

class Image extends PickType(ImageDto, [
  'id',
  'name',
  'description',
  'comments',
]) {}

export class FeedApiResponseDto extends PickType(PortfolioDto, [
  'id',
  'name',
  'description',
]) {
  @ApiProperty({
    name: 'images',
    type: Image,
    isArray: true,
  })
  images: Image[];
}
