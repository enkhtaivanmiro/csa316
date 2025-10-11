import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './projects/projects.entity';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/review.entity';
import { RentalPricingModule } from './rental_pricing/rental_pricing.module';
import { Rental_Pricing } from './rental_pricing/rental_pricing.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Projects, Review, Rental_Pricing],
      synchronize: false,
    }),

    TypeOrmModule.forFeature([Review]),

    AuthModule,
    UsersModule,
    DatabaseModule,
    ProjectsModule,
    ReviewsModule,
    RentalPricingModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ReviewsController,
  ],
  providers: [AppService, AuthService, ReviewsService],
})
export class AppModule {}
