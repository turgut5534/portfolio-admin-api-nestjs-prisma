import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsOptional()
  longDescription?: string;

  @IsOptional()
  coverImageUrl?: string;

  @IsOptional()
  githubUrl?: string;

  @IsOptional()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
