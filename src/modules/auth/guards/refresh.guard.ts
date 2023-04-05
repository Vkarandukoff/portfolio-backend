import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { isNil } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { JwtRefreshCookieKey } from '../constants/cookie-keys.constant';

config();
const configService = new ConfigService();
const jwtService = new JwtService();

export class RefreshGuard extends AuthGuard('refresh-jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshTokenFromCookie = request?.cookies[JwtRefreshCookieKey];
    const refreshTokenFromHeaders =
      request?.headers?.authorization?.split(' ')[1];

    if (isNil(refreshTokenFromCookie) && isNil(refreshTokenFromHeaders))
      return false;

    try {
      if (refreshTokenFromCookie) {
        request.user = await jwtService.verifyAsync(refreshTokenFromCookie, {
          secret: configService.get('JWT_SECRET_REFRESH'),
        });
        return true;
      }

      request.user = await jwtService.verifyAsync(refreshTokenFromHeaders, {
        secret: configService.get('JWT_SECRET_REFRESH'),
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
