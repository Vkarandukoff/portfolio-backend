import {
  Controller,
  HttpStatus,
  Post,
  Query,
  Req,
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
import { JwtTokensApiResponseDto } from './dtos/swagger/jwt-tokens-api-response.dto';
import { SuccessApiResponseDto } from './dtos/swagger/success.api-response.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-guard.service';
import { TokensType } from './types/tokens.type';
import { AccessJwtGuard } from './guards/access-jwt-guard.service';
import { Request } from 'express';

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
    @Query() createUserDto: CreateUserDto
  ): Promise<TokensType> {
    return this.authService.signup(createUserDto);
  }

  @ApiResponse({
    type: JwtTokensApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @ApiOperation({ summary: 'should return jwt tokens' })
  @Post('login')
  async login(
    @Query() loginUserDto: LoginUserDto
  ): Promise<TokensType> {
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
  async logout(@Req() req: Request): Promise<SuccessApiResponseDto> {
    const userId = req.user['userId'];
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @ApiOperation({ summary: 'should refresh users jwt token' })
  @ApiResponse({
    type: JwtTokensApiResponseDto,
    status: HttpStatus.CREATED,
  })
  @Post('refresh')
  async refresh(@Req() { user }: Request): Promise<TokensType> {
    return this.authService.refresh(user['userId'], user['username']);
  }
}
