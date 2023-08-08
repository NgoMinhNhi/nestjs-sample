import { IntersectionType } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { UserRole } from './user.entity';
import { Language } from '../session/session.entity';
import { PaginationDto, KeywordDto } from '../utils/dto/pagination.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
    {
      message: 'password too weak',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(UserRole))
  role: UserRole = UserRole.User;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(Language))
  language: Language = Language.Kor;

  @IsBoolean()
  @IsOptional()
  isForceLogout = false;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
    {
      message: 'password too weak',
    },
  )
  @IsNotEmpty()
  newPassword: string;
}

export class GetUsersDto extends IntersectionType(PaginationDto, KeywordDto) {}
