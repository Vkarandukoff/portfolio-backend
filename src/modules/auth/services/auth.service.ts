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
    const candidate = await this.usersService.findByUserName(
      username
    );
    if (candidate)
      throw new ConflictException(
        `User: ${username} already exist. Please login!`
      );

    const hashedPassword = await bcrypt.hash(password, 3);
    const { id: userId } = await this.usersService.createNewUser({
      username,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(userId, username);

    await this.usersService.updateRefreshToken(
      userId,
      tokens.refresh_token
    );

    return { ...tokens };
  }

  public async login({
    username,
    password,
  }: LoginUserDto): Promise<TokensType> {
    const user = await this.usersService.findByUserName(username);
    if (!user)
      throw new BadRequestException(
        `User ${username} does not exist`
      );

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!passwordCorrect)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.generateTokens(user.id, username);

    await this.usersService.updateRefreshToken(
      user.id,
      tokens.refresh_token
    );

    return { ...tokens };
  }

  public async logout(userId: number) {
    return this.usersService
      .updateRefreshToken(userId, null)
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }));
  }

  public async refresh(user: Express.User): Promise<AccessTokenType> {
    const [userId, username] = [user['userId'], user['username']];

    const { access_token } = await this.generateTokens(
      userId,
      username
    );

    return { access_token };
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
}
