import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  public async createNewUser(
    user: Partial<UserEntity>
  ): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  public async findByUserName(
    username: string
  ): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  public async findById(
    userId: number
  ): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  public async updateRefreshToken(
    userId: number,
    refreshToken: string | null
  ) {
    return this.usersRepository.update(
      { id: userId },
      { refreshToken }
    );
  }
}
