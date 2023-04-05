import { ApiProperty, PickType } from '@nestjs/swagger';
import { ImageDto } from '@src/dtos/image.dto';
import { PortfolioDto } from '@src/dtos/portfolio.dto';

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
  'createdAt',
]) {
  @ApiProperty({
    name: 'createdBy',
    type: Number,
  })
  createdBy: number;

  @ApiProperty({
    name: 'images',
    type: Image,
    isArray: true,
  })
  images: Image[];
}

export class PortfolioWithImagesDto extends PickType(PortfolioDto, [
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
