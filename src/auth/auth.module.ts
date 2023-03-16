import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {AccessTokenStrategy} from './strategies/access-token.strategy';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants/constants';
import {AuthController} from './auth.controller';
import {RefreshTokenStrategy} from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.accessSecretKey,
      signOptions: {expiresIn: '30m'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
