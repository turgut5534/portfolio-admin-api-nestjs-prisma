import { IsString, IsOptional, IsUrl, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  fullName: string;

  @IsString()
  title: string;

  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @IsOptional()
  @IsUrl()
  cvUrl?: string;
}
