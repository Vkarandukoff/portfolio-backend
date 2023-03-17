import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadImageDto } from '../dtos/upload-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../../../entities';
import { Repository } from 'typeorm';
import { PortfolioService } from '../../portfolio/services/portfolio.service';

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
  ) {
    const portfolio = await this.portfolioService.findById(
      portfolioId
    );
    if (!portfolio)
      throw new BadRequestException('Cannot find portfolio!');

    return this.imageRepository.save({
      name,
      description,
      comments,
      uploadedBy: { id: userId },
      portfolio: { id: portfolioId },
    });
  }

  public async deleteById(imageId: number) {
    return this.imageRepository.delete({ id: imageId });
  }
}
