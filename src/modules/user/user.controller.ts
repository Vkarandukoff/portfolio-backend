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
import { SuccessApiResponseDto } from '../auth/dtos/swagger/success.api-response.dto';
import { AccessJwtGuard } from '../auth/guards/access-jwt-guard';
import { UserInRequest } from '../auth/types/user-in-request.type';

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
  deleteProfile(
    @Req() { user }: UserInRequest
  ): Promise<SuccessApiResponseDto> {
    return this.userService.deleteProfileById(user.userId);
  }
}
