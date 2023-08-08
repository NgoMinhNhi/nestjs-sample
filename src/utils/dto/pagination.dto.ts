import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn,
  MinLength,
} from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(30)
  limit: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(['ASC', 'DESC']))
  order: 'ASC' | 'DESC' = 'DESC';
}

export class KeywordDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  keyword: string;
}
