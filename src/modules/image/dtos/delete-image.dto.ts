import { PickType } from '@nestjs/swagger';
import { ImageDto } from '@src/dtos/image.dto';

export class DeleteImageDto extends PickType(ImageDto, ['id']) {}
