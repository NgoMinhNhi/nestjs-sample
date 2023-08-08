import { IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { KeywordDto, PaginationDto } from 'src/utils/dto/pagination.dto';

export class CreateFirmwareDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])$/,
    {
      message: 'version invalid',
    },
  )
  version: string;

  @IsString()
  @IsNotEmpty()
  downloadUrl: string;

  @IsString()
  @IsOptional()
  note: string;
}

export class UpdateFirmwareDto {
  @IsString()
  @IsOptional()
  @Matches(
    /^\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.\b([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])$/,
    {
      message: 'version invalid',
    },
  )
  version: string;

  @IsString()
  @IsOptional()
  downloadUrl: string;

  @IsString()
  @IsOptional()
  note: string;
}

export class GetFirmwaresDto extends IntersectionType(
  PaginationDto,
  KeywordDto,
) {}
