import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
  IsPositive,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  ON_HOLD = 'on_hold',
}

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  project_id: number;

  @IsNotEmpty()
  @IsIn(['daily', 'weekly', 'monthly'])
  length: 'daily' | 'weekly' | 'monthly';
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsDateString()
  renewal_date?: string;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;
}

export class UpdateStatusDto {
  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  status: SubscriptionStatus;
}

export class RenewSubscriptionDto {
  @IsNotEmpty()
  @IsIn(['daily', 'weekly', 'monthly'])
  length: 'daily' | 'weekly' | 'monthly';
}

export class BulkCreateSubscriptionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubscriptionDto)
  subscriptions: CreateSubscriptionDto[];
}

export class SubscriptionQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  user_id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  project_id?: number;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}