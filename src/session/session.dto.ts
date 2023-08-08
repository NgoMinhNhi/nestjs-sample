import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { Language } from './session.entity';

export class ChangeLanguageDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(Language))
  language: Language;
}
