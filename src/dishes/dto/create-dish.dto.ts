import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsUUID('4')
  categoryId: string;
}
