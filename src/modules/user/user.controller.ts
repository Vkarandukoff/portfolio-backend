import {
  Controller,
  Delete,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { Request } from 'express';
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard.service';

@UseGuards(AccessJwtGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'should delete user profile' })
  @Delete('delete-profile')
  deleteProfile(@Req() req: Request): Promise<SuccessApiResponseDto> {
    const userId = req.user['userId'];
    return this.userService.deleteProfileById(userId);
  }
}
