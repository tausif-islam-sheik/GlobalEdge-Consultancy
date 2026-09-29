import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AppStatus } from '@prisma/client';

export const APP_STATUSES: AppStatus[] = [
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'OFFER',
  'VISA',
  'APPROVED',
  'REJECTED',
];

export class CreateApplicationDto {
  @IsString() @IsNotEmpty() passportNumber: string;
  @IsOptional() @IsString() university?: string;
  @IsOptional() @IsString() programId?: string;
  @IsOptional() @IsString() userId?: string;
}

export class UpdateStatusDto {
  @IsIn(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'OFFER', 'VISA', 'APPROVED', 'REJECTED'])
  status: AppStatus;
  @IsOptional() @IsString() note?: string;
}
