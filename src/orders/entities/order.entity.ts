import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orderdish } from './orderdish.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column('int')
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Orderdish, (orderdish) => orderdish.order, { cascade: true })
  orderDishes: Orderdish[];
}
