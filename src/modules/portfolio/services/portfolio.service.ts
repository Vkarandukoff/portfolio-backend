import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../../../entities';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from '../dtos/create-portfolio.dto';
import { CreatePortfolioApiResponseDto } from '../dtos/swagger/create-portfolio.api-response.dto';
import { SuccessApiResponseDto } from '../../auth/dtos/swagger/success.api-response.dto';
import { FeedApiResponseDto } from '../dtos/swagger/feed.api-response.dto';
import { UpdatePortfolioDto } from '../dtos/update-portfolio.dto';
import { isEmpty, isNil } from 'lodash';

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
  ): Promise<CreatePortfolioApiResponseDto> {
    return this.portfolioRepository
      .save({
        name,
        description,
        createdBy: { id: userId },
      })
      .then(({ id, name, description, createdAt }) => {
        return {
          id,
          name,
          description,
          createdAt,
        };
      });
  }

  public async deleteById(portfolioId: number): Promise<SuccessApiResponseDto> {
    return this.portfolioRepository
      .delete({ id: portfolioId })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }));
  }

  public async getAllWithImages(): Promise<FeedApiResponseDto[]> {
    return this.portfolioRepository
      .find({
        relations: ['images', 'createdBy'],
        order: { createdAt: 'desc' },
      })
      .then((portfolios) =>
        portfolios.map(({ id, name, description, images, createdBy, createdAt }) => ({
          id,
          name,
          description,
          createdBy: createdBy.id,
          createdAt,
          images: images.map(({ id, name, description, comments }) => ({
            id,
            name,
            description,
            comments,
          })),
        }))
      );
  }

  public async getOneWithImages(id: number): Promise<FeedApiResponseDto> {
    return this.portfolioRepository
      .findOne({ where: { id }, relations: ['images', 'createdBy'] })
      .then(({ id, name, description, createdAt, createdBy, images }) => ({
        id,
        name,
        description,
        createdAt,
        createdBy: createdBy.id,
        images: images.map(({ id, name, description, comments }) => ({
          id,
          name,
          description,
          comments,
        })),
      }));
  }

  public async update(
    id: number,
    { name, description }: UpdatePortfolioDto
  ): Promise<SuccessApiResponseDto> {
    if (isNil(name) && isNil(description))
      throw new BadRequestException('Nothing fields to update');

    const portfolio = await this.portfolioRepository.findOneBy({
      id,
    });
    if (isNil(portfolio)) throw new BadRequestException(`Cannot find portfolio with id: ${id}`);

    const fieldsForUpdate: Partial<Portfolio> = {
      name: name ?? portfolio.name,
      description: description ?? portfolio.description,
    };
    return this.portfolioRepository
      .update({ id }, fieldsForUpdate)
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }));
  }
}
