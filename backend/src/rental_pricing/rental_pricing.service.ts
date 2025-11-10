import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental_Pricing } from './rental_pricing.entity';
import { rentalPricingDto } from './rental_pricing.dto';

@Injectable()
export class RentalPricingService {
    constructor(
        @InjectRepository(Rental_Pricing)
        private readonly rentalPricingRepository: Repository<Rental_Pricing>,
    ) {}


    async findOne(id) {
        return this.rentalPricingRepository.findOne({ where: {id: id}});
    }
    async findByProjectId(project_id: number) {
        return this.rentalPricingRepository.find({
            where: { project_id },
        });
    }

    async createRentalPricing(rentalPricingDto: rentalPricingDto) {
        const rental_pricing = this.rentalPricingRepository.create(rentalPricingDto);
        return this.rentalPricingRepository.save(rental_pricing);
    }
}
