import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class GetActiveDto {
  @IsString()
  title: string;

  @IsNumber()
  category_id: number;

  @IsString()
  thumbnail_url: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean; 
}