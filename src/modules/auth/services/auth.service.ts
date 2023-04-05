import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { AccessTokenType, TokensType } from '../types/tokens.type';
import { GoogleUserType } from '../types/google.type';
import { User } from '@src/entities';
import { UserType } from '../types/user-in-request.type';
import { isNil } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async signup({
    username,
    password,
  }: CreateUserDto): Promise<TokensType> {
    if (isNil(username) || isNil(password))
      throw new BadRequestException('All fields are necessary');

    const candidate = await this.usersService.findByUserName(username);
    if (candidate)
      throw new ConflictException(
        `User: ${username} already exist. Please login!`
      );

    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await this.usersService.createNewUser({
      username,
      password: hashedPassword,
    });

    return this.generateAndUpdateRefreshToken(user);
  }

  public async login({
    username,
    password,
  }: LoginUserDto): Promise<TokensType> {
    if (isNil(username) || isNil(password))
      throw new BadRequestException('All fields are necessary');

    const user = await this.usersService.findByUserName(username);
    if (!user) throw new BadRequestException(`User ${username} does not exist`);
    if (user.provider)
      throw new BadRequestException(`Please, login with ${user.provider}`);

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      throw new BadRequestException('Password is incorrect');

    return this.generateAndUpdateRefreshToken(user);
  }

  public async logout(userId: number) {
    return this.usersService
      .updateRefreshToken(userId, null)
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }));
  }

  public async refresh({
    userId,
    username,
  }: UserType): Promise<AccessTokenType> {
    const { access_token } = await this.generateTokens(userId, username);

    return { access_token };
  }

  public async googleSignupOrLogin({
    provider,
    email,
    picture,
  }: GoogleUserType) {
    const user = await this.usersService.findByUserName(email);
    if (user) {
      return this.generateAndUpdateRefreshToken(user);
    }
    if (!user?.provider)
      throw new BadRequestException('Please, login with credentials!');

    const newUser = await this.usersService.createNewUser({
      username: email,
      pictureUrl: picture,
      provider,
    });

    return this.generateAndUpdateRefreshToken(newUser);
  }

  public async generateTokens(
    userId: number,
    username: string
  ): Promise<TokensType> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: this.configService.get('JWT_SECRET_ACCESS'),
          expiresIn: this.configService.get('ACCESS_EXPIRES_IN'),
        }
      ),
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: this.configService.get('JWT_SECRET_REFRESH'),
          expiresIn: this.configService.get('REFRESH_EXPIRES_IN'),
        }
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  public async generateAndUpdateRefreshToken(user: User): Promise<TokensType> {
    const tokens = await this.generateTokens(user.id, user.username);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);
    return { ...tokens };
  }
}
