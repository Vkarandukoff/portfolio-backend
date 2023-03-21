import { Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AccessTokenApiResponseDto } from './dtos/swagger/access-token.api-response.dto';

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
}
