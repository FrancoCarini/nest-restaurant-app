import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Additionalgroup } from '../../additionalgroups/entities/additionalgroup.entity';
import { Category } from '../../categories/entities/category.entity';
import { Orderdish } from '../../orders/entities/orderdish.entity';

@Entity({ name: 'dishes' })
export class Dish {
  @ApiProperty({
    example: '1b091473-a3e0-46b4-a367-3082f77f5a0d',
    description: 'Dish ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Pizza Fugazzeta',
    description: 'Dish Name',
  })
  @Column('text', {
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 'Pizza de cebolla y Muzzarella',
    description: 'Dish Full Description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example: 100,
    description: 'Dish Price',
  })
  @Column('int', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: true,
    description: 'If the dish is active or not',
    default: true,
  })
  @Column('bool', {
    default: true,
  })
  active: boolean;

  @ApiProperty({
    example: 'http://imageurl',
    description: 'URL with image',
  })
  @Column('text', {
    nullable: true,
  })
  image: string;

  @ApiProperty({
    example: '2023-02-17T16:05:34.954Z',
    description: 'Dish Creation Date in UTC',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.dishes)
  category: Category;

  @OneToMany(() => Additionalgroup, (additionalGroup) => additionalGroup.dish)
  additionalGroup: Additionalgroup[];

  @OneToMany(() => Orderdish, (orderdish) => orderdish.dish)
  orderDish: Orderdish[];
}
