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
import { jwtConstants } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  public async signup({ username, password }: CreateUserDto) {
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

    return this.generateJwtToken(userId, username);
  }

  public async login({ username, password }: LoginUserDto) {
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

    return await this.generateJwtToken(user.id, username);
  }

  public async logout(token: string) {
    return token;
  }

  public async generateJwtToken(userId: number, username: string) {
    return this.jwtService.signAsync(
      {
        userId,
        username,
      },
      {
        secret: jwtConstants.accessSecretKey,
        expiresIn: '30m',
      }
    );
  }
}
