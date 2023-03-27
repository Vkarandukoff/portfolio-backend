import { Body, Controller, Delete, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadImageDto } from './dtos/upload-image.dto';
import { ImageService } from './services/image.service';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { UploadImageApiResponseDto } from './dtos/swagger/upload-image.api-response.dto';
import { UserInRequest } from '../auth/types/user-in-request.type';

@ApiBearerAuth()
@UseGuards(AccessJwtGuard)
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(public imageService: ImageService) {}

  @ApiResponse({
    type: UploadImageApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'should upload image' })
  @Post('upload')
  upload(
    @Body() body: UploadImageDto,
    @Req() { user }: UserInRequest
  ): Promise<UploadImageApiResponseDto> {
    return this.imageService.upload(user.userId, body);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'should delete image' })
  @Delete('delete')
  delete(@Query() { id }: DeleteImageDto): Promise<SuccessApiResponseDto> {
    return this.imageService.deleteById(id);
  }
}
