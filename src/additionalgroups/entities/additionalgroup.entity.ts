import { Dish } from '../../dishes/entities/dish.entity';
import { Additional } from '../../additionals/entities/additional.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('additionalgroups')
export class Additionalgroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('bool', {
    default: false,
  })
  required: boolean;

  @Column('int', {
    nullable: true,
  })
  maxSelect: number;

  @Column('int', {
    nullable: true,
  })
  minSelect: number;

  @Column('bool', {
    default: true,
  })
  isCheckboxSelector: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Dish, (dish) => dish.additionalGroup)
  dish: Dish;

  @OneToMany(() => Additional, (additional) => additional.additionalgroup)
  additional: Additional[];
}
