import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { createReviewDto } from './reviews.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Get all reviews by project id' })
  @Get(':id')
  async findAllById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findAllById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    schema: {
      example: {
        user_id: "13",
        title: "New Project",
        description: "This is a sample project",
        category_id: 1,
        file_url: "https://example.com/file.pdf",
        thumbnail_url: "https://images-ext-1.discordapp.net/external/bH_o5KyNV_4TFZqLviOSg3Ai7QzQK8Cb6G1l2hikdts/%3Fa488808/https/i.imgflip.com/a35oll.png?format=webp&quality=lossless",
        is_active: true 
      }
    }
  })
  @ApiOperation({ summary: 'Create Review for project'})
  @Post()
  async giveReview(@Body() createReviewDto: createReviewDto) {
    return this.reviewsService.giveReview(createReviewDto);
  }
}
