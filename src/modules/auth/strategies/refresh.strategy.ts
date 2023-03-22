import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwt.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_REFRESH'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
