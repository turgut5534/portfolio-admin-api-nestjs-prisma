// admin/dto/create-admin.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters' })
  password: string;

  @IsString()
  domain: string
}
