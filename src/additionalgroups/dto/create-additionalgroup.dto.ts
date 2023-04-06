import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateAdditionalgroupDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  required: boolean;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxSelect: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  minSelect: number;

  @IsBoolean()
  @IsOptional()
  isCheckboxSelector: boolean;

  @IsUUID('4')
  dishId: string;
}
