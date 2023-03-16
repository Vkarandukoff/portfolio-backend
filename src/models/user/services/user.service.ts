import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async createNewUser(
    user: Partial<UserEntity>
  ): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  public async findByUserName(
    username: string
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  public async findById(
    userId: number
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ id: userId });
  }

  public async updateRefreshToken(
    userId: number,
    refreshToken: string | null
  ) {
    return this.userRepository.update(
      { id: userId },
      { refreshToken }
    );
  }

  public async deleteProfileById(userId) {
    return this.userRepository.delete({ id: userId });
  }
}
