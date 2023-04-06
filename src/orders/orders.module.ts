import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { UsersModule } from '../users/users.module';
import { Orderdish } from './entities/orderdish.entity';
import { DishesModule } from '../dishes/dishes.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Order, Orderdish]),
    UsersModule,
    DishesModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
