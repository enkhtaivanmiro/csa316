import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  user_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  category_id: number;

  @IsString()
  file_url: string;

  @IsString()
  thumbnail_url: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean; 
}