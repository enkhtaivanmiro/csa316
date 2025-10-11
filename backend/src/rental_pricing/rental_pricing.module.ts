import { Module } from '@nestjs/common';
import { RentalPricingController } from './rental_pricing.controller';
import { RentalPricingService } from './rental_pricing.service';
import { Rental_Pricing } from './rental_pricing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rental_Pricing])],
  controllers: [RentalPricingController],
  providers: [RentalPricingService]
})
export class RentalPricingModule {}
