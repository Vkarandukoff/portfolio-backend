import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get('JWT_SECRET_ACCESS'),
      signOptions: {
        expiresIn: configService.get('ACCESS_EXPIRES_IN'),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
