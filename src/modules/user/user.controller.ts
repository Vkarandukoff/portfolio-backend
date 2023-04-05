import {
  Controller,
  Delete,
  Get,
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
import { UserInfoDto } from './dtos/swagger/user-info.dto';

@ApiBearerAuth()
@UseGuards(AccessJwtGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @ApiResponse({
    type: UserInfoDto,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'should return user info from jwt token' })
  @Get('info')
  info(@Req() { user }: UserInRequest): Promise<UserInfoDto> {
    return this.userService.findById(user.userId);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: 'should delete user profile' })
  @Delete('delete-profile')
  deleteProfile(
    @Req() { user }: UserInRequest
  ): Promise<SuccessApiResponseDto> {
    return this.userService.deleteProfileById(user.userId);
  }
}
