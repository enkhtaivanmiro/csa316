import { IsDate, IsNumber, IsString } from "class-validator";

export class createReviewDto {
    @IsNumber()
    user_id: number;

    @IsNumber()
    project_id: number;

    @IsNumber()
    rating: number;

    @IsString()
    comment: string;

    @IsDate()
    review_date: Date;
}