import { Controller, Delete, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'should delete user profile' })
  @Delete('delete-profile')
  deleteProfile(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.userService.deleteProfileById(userId);
  }
}
