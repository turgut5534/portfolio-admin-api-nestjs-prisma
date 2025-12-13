import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  educationName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
