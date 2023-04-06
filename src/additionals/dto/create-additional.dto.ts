import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateAdditionalDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  price: number;

  @IsUUID('4')
  additionalGroupId: string;
}
