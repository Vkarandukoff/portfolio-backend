import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../../../entities';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from '../dtos/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    public portfolioRepository: Repository<Portfolio>
  ) {}

  public findById(portfolioId: number) {
    return this.portfolioRepository.findOneBy({ id: portfolioId });
  }

  public async create(
    userId: number,
    { name, description }: CreatePortfolioDto
  ) {
    return this.portfolioRepository.save({
      name,
      description,
      createdBy: { id: userId },
    });
  }

  public async deleteById(portfolioId: number) {
    return this.portfolioRepository.delete({ id: portfolioId });
  }
}
