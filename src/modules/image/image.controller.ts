import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadImageDto } from './dtos/upload-image.dto';
import { Request } from 'express';
import { ImageService } from './services/image.service';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(public imageService: ImageService) {}

  @ApiOperation({ summary: 'should upload image' })
  @Post('upload')
  upload(@Body() body: UploadImageDto, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.imageService.upload(userId, body);
  }

  @ApiOperation({ summary: 'should delete image' })
  @Delete('delete')
  delete(@Query() { id }: DeleteImageDto) {
    return this.imageService.deleteById(id);
  }
}
