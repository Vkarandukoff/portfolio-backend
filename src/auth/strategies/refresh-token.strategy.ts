import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';
import { JwtPayload } from '../types/jwt.types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.refreshSecretKey,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req
      .get('Authorization')
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
