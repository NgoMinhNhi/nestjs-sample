import { IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { KeywordDto, PaginationDto } from 'src/utils/dto/pagination.dto';

export class CreateLightDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    message: 'Incorrect mac address format',
  })
  macAddress: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2 ** 16)
  lightNum: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2 ** 16)
  groupNum: number;
}

export class CreateLightsDto {
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateLightDto)
  lights: CreateLightDto[];
}

export class UpdateLightDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2 ** 16)
  groupNum: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2 ** 16)
  lightNum: number;
}

export class MacAddressDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    message: 'Incorrect mac address format',
  })
  macAddress: string;
}

export class GetLightsDto extends IntersectionType(PaginationDto, KeywordDto) {}
