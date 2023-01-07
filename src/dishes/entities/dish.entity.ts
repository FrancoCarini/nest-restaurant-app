import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dishes' })
export class Dish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;

  @Column('int', {
    default: 0,
  })
  price: number;

  @Column('int', {
    default: 1,
  })
  order: number;

  @Column('bool', {
    default: true,
  })
  active: boolean;

  @Column('text', {
    nullable: true,
  })
  image: string;
}
