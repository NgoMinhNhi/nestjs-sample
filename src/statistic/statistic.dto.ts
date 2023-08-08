import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCompanyInfoDto {
  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  copyright: string;
}

export class UpdateForgotPasswordPhoneNumberDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
