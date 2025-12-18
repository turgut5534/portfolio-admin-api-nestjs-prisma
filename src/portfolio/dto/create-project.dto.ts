import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @IsOptional()
  githubUrl?: string;

  @IsOptional()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
