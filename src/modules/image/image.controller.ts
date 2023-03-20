import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadImageDto } from './dtos/upload-image.dto';
import { Request } from 'express';
import { ImageService } from './services/image.service';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(public imageService: ImageService) {}

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'should upload image' })
  @Post('upload')
  upload(@Body() body: UploadImageDto, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.imageService.upload(userId, body);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'should delete image' })
  @Delete('delete')
  delete(@Query() { id }: DeleteImageDto) {
    return this.imageService.deleteById(id);
  }
}
