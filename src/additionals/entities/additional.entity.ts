import { Additionalgroup } from '../../additionalgroups/entities/additionalgroup.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('additionals')
export class Additional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int', {
    default: 0,
  })
  price: number;

  @Column('bool', {
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => Additionalgroup,
    (additionalgroup) => additionalgroup.additional,
  )
  additionalgroup: Additionalgroup;
}
