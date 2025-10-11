import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RentalPricingService } from './rental_pricing.service';
import { rentalPricingDto } from './rental_pricing.dto';

@Controller('rental-pricing')
export class RentalPricingController {
    constructor(private readonly rentalPricingService: RentalPricingService) {}

    @Get('id/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.rentalPricingService.findOne(id);
    }

    @Get('project/:project_id')
    async findByProjectId(@Param('project_id', ParseIntPipe) project_id: number) {
        return this.rentalPricingService.findByProjectId(project_id);
    }

    @ApiBody({
        schema: {
            example: {
                project_id: 1,
                type: 'hourly weekly or monthly',
                price: 10000,
            }
        }
    })
    @ApiOperation({ summary: 'create rental_pricing enums are: daily, weekly, monthly, null'})
    @Post()
    async createRentalPricing(@Body() rentalPricingDto: rentalPricingDto) {
        return this.rentalPricingService.createRentalPricing(rentalPricingDto);
    }
}
