import { IsNumber, IsString } from "class-validator";

export class rentalPricingDto {
    @IsNumber()
    user_id: number;

    @IsNumber()
    project_id: number;

    @IsString()
    type: string;

    @IsNumber()
    price: number;
}