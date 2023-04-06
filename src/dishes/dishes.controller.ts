import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidRoles } from '../users/interfaces';
import { Auth } from '../users/decorators/auth.decorator';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dish } from './entities/dish.entity';

@ApiTags('Dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: Dish,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Auth(ValidRoles.admin)
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }
}
