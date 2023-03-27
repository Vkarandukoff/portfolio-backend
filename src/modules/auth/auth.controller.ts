import { Controller, Get, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import {
  AccessJwtTokenApiResponseDto,
  JwtTokensApiResponseDto,
} from './dtos/swagger/jwt-tokens-api-response.dto';
import { SuccessApiResponseDto } from './dtos/swagger/success.api-response.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-guard';
import { AccessTokenType, TokensType } from './types/tokens.type';
import { AccessJwtGuard } from './guards/access-jwt-guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { GoogleUserInRequestType, UserInRequest } from './types/user-in-request.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: JwtTokensApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({
    summary: 'should create new user and return jwt tokens',
  })
  @Post('signup')
  async signup(@Query() createUserDto: CreateUserDto): Promise<TokensType> {
    return this.authService.signup(createUserDto);
  }

  @ApiResponse({
    type: JwtTokensApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'should return jwt tokens' })
  @Post('login')
  async login(@Query() loginUserDto: LoginUserDto): Promise<TokensType> {
    return this.authService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiOperation({ summary: 'should delete refresh token' })
  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('logout')
  async logout(@Req() { user }: UserInRequest): Promise<SuccessApiResponseDto> {
    return this.authService.logout(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @ApiOperation({ summary: 'should refresh users jwt token' })
  @ApiResponse({
    type: AccessJwtTokenApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('refresh')
  async refresh(@Req() { user }: UserInRequest): Promise<AccessTokenType> {
    return this.authService.refresh(user);
  }

  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'signup or login with google profile' })
  @Get('google')
  googleAuth() {
    return;
  }

  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'oauth callback with google profile ' })
  @Get('google/callback')
  googleLogin(@Req() { user }: GoogleUserInRequestType) {
    return this.authService.googleSignupOrLogin(user);
  }
}
