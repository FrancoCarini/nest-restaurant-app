import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Dish } from '../../dishes/entities/dish.entity';

@Entity('orderdish')
export class Orderdish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderDishes)
  order: Order;

  @ManyToOne(() => Dish, (dish) => dish.orderDish)
  dish: Dish;

  @Column('int')
  price: number;

  @Column('int')
  priceAdditional: number;

  @Column('int')
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
