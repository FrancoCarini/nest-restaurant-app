import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class DishesAdditionalsDto {
  @IsUUID('4')
  id: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

class DishesOrderDtos {
  @IsUUID('4')
  id: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @ArrayNotEmpty()
  @IsOptional()
  @Type(() => DishesAdditionalsDto)
  @ValidateNested({ each: true })
  additionals: DishesAdditionalsDto[];
}

export class CreateOrderDto {
  @ArrayNotEmpty()
  @IsDefined()
  @Type(() => DishesOrderDtos)
  @ValidateNested({ each: true })
  dishes: DishesOrderDtos[];
}
