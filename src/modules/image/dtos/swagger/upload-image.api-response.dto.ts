import { PickType } from '@nestjs/swagger';
import { ImageDto } from '@src/dtos/image.dto';

export class UploadImageApiResponseDto extends PickType(ImageDto, [
  'id',
  'name',
  'description',
  'comments',
  'createdAt',
]) {}
