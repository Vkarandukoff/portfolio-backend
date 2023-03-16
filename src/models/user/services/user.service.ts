import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async createNewUser(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findByUserName(
    username: string
  ): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  public async findById(userId: number): Promise<User | undefined> {
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
