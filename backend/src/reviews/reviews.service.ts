import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createReviewDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async findAllById(project_id: number) {
    return this.reviewsRepository.find({
      where: { project_id },
    });
  }

  async giveReview(createReviewDto: createReviewDto) {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }
}
