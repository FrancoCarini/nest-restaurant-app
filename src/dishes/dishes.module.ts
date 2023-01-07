import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { Dish } from './entities/dish.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Dish]), UsersModule],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
