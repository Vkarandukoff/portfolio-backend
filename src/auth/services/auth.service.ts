import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../models/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  public async signup({
    username,
    password,
  }: CreateUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
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

    const tokens = await this.getTokens(userId, username);

    await this.hashAndSaveRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  public async login({ username, password }: LoginUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
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

    const tokens = await this.getTokens(user.id, username);

    await this.hashAndSaveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  public async logout(userId: number) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(userId, user.username);

    await this.hashAndSaveRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  public async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: jwtConstants.accessSecretKey,
          expiresIn: '30m',
        }
      ),
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: jwtConstants.refreshSecretKey,
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashAndSaveRefreshToken(
    userId: number,
    refreshToken: string
  ) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 3);
    return this.usersService.updateRefreshToken(
      userId,
      hashedRefreshToken
    );
  }
}
