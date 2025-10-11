import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class getProjectDto {
  @IsString()
  id: number;
}