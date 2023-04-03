import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadImageDto } from '../dtos/upload-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '@src/entities';
import { Repository } from 'typeorm';
import { PortfolioService } from '../../portfolio/services/portfolio.service';
import { UploadImageApiResponseDto } from '../dtos/swagger/upload-image.api-response.dto';
import { isNil } from 'lodash';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    public imageRepository: Repository<Image>,
    public portfolioService: PortfolioService
  ) {}

  public async upload(
    userId: number,
    { name, description, comments, portfolioId }: UploadImageDto
  ): Promise<UploadImageApiResponseDto> {
    if (isNil(name)) throw new BadRequestException('Name is necessary');

    const portfolio = await this.portfolioService.findById(portfolioId);
    if (!portfolio) throw new BadRequestException('Cannot find portfolio!');

    return this.imageRepository
      .save({
        name,
        description,
        comments,
        uploadedBy: { id: userId },
        portfolio: { id: portfolioId },
      })
      .then(({ id, name, description, comments, createdAt }) => ({
        id,
        name,
        description,
        comments,
        createdAt,
      }));
  }

  public async deleteById(imageId: number) {
    if (isNil(imageId)) throw new BadRequestException('Image id is necessary');

    return this.imageRepository
      .delete({ id: imageId })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }));
  }
}
