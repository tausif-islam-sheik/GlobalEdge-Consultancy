import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export const APP_STATUSES: ApplicationStatus[] = [
  'PENDING',
  'SUBMITTED',
  'UNDER_REVIEW',
  'OFFER_RECEIVED',
  'ACCEPTED',
  'REJECTED',
  'WITHDRAWN',
];

export class CreateApplicationDto {
  @IsOptional() @IsString() studentId?: string;
  @IsOptional() @IsString() universityId?: string;
  @IsOptional() @IsString() programId?: string;
  @IsOptional() @IsString() intakeId?: string;
  @IsOptional() @IsString() campusId?: string;
  @IsOptional() @IsString() stageId?: string;
  @IsOptional() @IsString() agentId?: string;
  // legacy lookup: find the student by passport when ids are unknown
  @IsOptional() @IsString() passportNumber?: string;
}

export class UpdateStatusDto {
  @IsIn(['PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'OFFER_RECEIVED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'])
  status: ApplicationStatus;
  @IsOptional() @IsString() note?: string;
}
