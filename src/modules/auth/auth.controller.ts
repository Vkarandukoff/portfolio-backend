import {
  Controller,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { AccessTokenApiResponseDto } from './dtos/swagger/access-token.api-response.dto';
import { SuccessApiResponseDto } from './dtos/swagger/success.api-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: AccessTokenApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('signup')
  async signup(
    @Query() createUserDto: CreateUserDto
  ): Promise<{ access_token: string }> {
    return this.authService.signup(createUserDto);
  }

  @ApiResponse({
    type: AccessTokenApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('login')
  async login(
    @Query() loginUserDto: LoginUserDto
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(
    @Req() req: Request
  ): Promise<{ access_token: string }> {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(token);
  }
}
