import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import {
  AccessJwtTokenApiResponseDto,
  JwtTokensApiResponseDto,
} from './dtos/swagger/jwt-tokens-api-response.dto';
import { SuccessApiResponseDto } from './dtos/swagger/success.api-response.dto';
import { AccessTokenType, TokensType } from './types/tokens.type';
import { AccessJwtGuard } from './guards/access-jwt-guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import {
  GoogleUserInRequestType,
  UserInRequest,
} from './types/user-in-request.type';
import { Response } from 'express';
import { RefreshGuard } from './guards/refresh.guard';
import {
  JwtRefreshCookieKey,
  JwtRefreshCookieMaxAge,
} from './constants/cookie-keys.constant';

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
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<TokensType> {
    const tokens = await this.authService.signup(createUserDto);
    res.cookie(JwtRefreshCookieKey, tokens.refresh_token, {
      maxAge: JwtRefreshCookieMaxAge,
    });
    return tokens;
  }

  @ApiResponse({
    type: JwtTokensApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'should return jwt tokens' })
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<TokensType> {
    const tokens = await this.authService.login(loginUserDto);
    res.cookie(JwtRefreshCookieKey, tokens.refresh_token, {
      maxAge: JwtRefreshCookieMaxAge,
    });
    return tokens;
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtGuard)
  @ApiOperation({ summary: 'should delete refresh token' })
  @ApiResponse({
    type: SuccessApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('logout')
  async logout(
    @Req() { user }: UserInRequest,
    @Res({ passthrough: true }) res: Response
  ): Promise<SuccessApiResponseDto> {
    res.cookie(JwtRefreshCookieKey, '');
    return this.authService.logout(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshGuard)
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
  async googleLogin(
    @Req() { user }: GoogleUserInRequestType,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.googleSignupOrLogin(user);
    res.cookie(JwtRefreshCookieKey, tokens.refresh_token, {
      maxAge: JwtRefreshCookieMaxAge,
    });
    return tokens;
  }
}
