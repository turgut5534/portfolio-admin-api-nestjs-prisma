// admin/dto/create-admin.dto.ts
import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator'
import { UserRole } from './user-role'

export class CreateAdminDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string

  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters' })
  password: string

  @IsNotEmpty({ message: 'Domain is required' })
  domain: string

  @IsEnum(UserRole)
  role: UserRole
}
