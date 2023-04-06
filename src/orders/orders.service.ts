import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { DishesService } from '../dishes/dishes.service';
import { Orderdish } from './entities/orderdish.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dishService: DishesService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const dish1 = await this.dishService.findOne(
        '6f5a1ad9-64d0-427b-a2e4-54d0d3de384e',
      );
      const dish2 = await this.dishService.findOne(
        'f6cbd133-be30-4e61-8787-22abae9f4cfb',
      );

      const order = new Order();
      order.total = 20;
      order.user = user;

      const orderDish1 = new Orderdish();
      orderDish1.dish = dish1;
      orderDish1.price = 3000;
      orderDish1.priceAdditional = 0;
      orderDish1.total = 3000;

      const orderDish2 = new Orderdish();
      orderDish2.dish = dish2;
      orderDish2.price = 2500;
      orderDish2.priceAdditional = 0;
      orderDish2.total = 2500;

      order.orderDishes = [orderDish1, orderDish2];

      return await this.orderRepository.save(order);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private handleDbErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(`Something went wrong`);
  }
}
