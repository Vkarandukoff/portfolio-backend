import { Controller, Delete, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'should delete user profile' })
  @Delete('delete-profile')
  deleteProfile(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.userService.deleteProfileById(userId);
  }
}
