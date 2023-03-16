import {
  Controller,
  Post,
  Query,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/createUserDto';
import { LoginUserDto } from '../dtos/loginUserDto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { Request } from 'express';
import { UpdateResult } from 'typeorm';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Query() createUserDto: CreateUserDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(
    @Query() loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(loginUserDto);
  }

  @ApiBearerAuth('access')
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req: Request): Promise<UpdateResult> {
    return this.authService.logout(req.user['userId']);
  }

  @ApiBearerAuth('refresh')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['userId'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
