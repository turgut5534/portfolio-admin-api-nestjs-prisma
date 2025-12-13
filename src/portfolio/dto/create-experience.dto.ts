import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  companyName: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
