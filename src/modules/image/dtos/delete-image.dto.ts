import { PickType } from '@nestjs/swagger';
import { ImageDto } from '../../../dtos/image.dto';

export class DeleteImageDto extends PickType(ImageDto, ['id']) {}
