import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Additionalgroup } from './entities/additionalgroup.entity';
import { CreateAdditionalgroupDto } from './dto/create-additionalgroup.dto';
import { UpdateAdditionalgroupDto } from './dto/update-additionalgroup.dto';
import { DishesService } from '../dishes/dishes.service';

@Injectable()
export class AdditionalgroupsService {
  constructor(
    @InjectRepository(Additionalgroup)
    private readonly additionalGroupRepository: Repository<Additionalgroup>,
    private readonly dishService: DishesService,
  ) {}

  async create(createAdditionalgroupDto: CreateAdditionalgroupDto) {
    try {
      const { dishId } = createAdditionalgroupDto;
      // Check if Dish exists
      const dish = await this.dishService.findOne(dishId);

      const additionalGroup = this.additionalGroupRepository.create({
        ...createAdditionalgroupDto,
        dish,
      });
      return await this.additionalGroupRepository.save(additionalGroup);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async findOne(id: string) {
    const additionalGroup = await this.additionalGroupRepository.findOneBy({
      id,
    });

    if (!additionalGroup)
      throw new NotFoundException(`Additional group with id ${id} not found`);

    return additionalGroup;
  }

  async findAll() {
    return await this.additionalGroupRepository.find({
      relations: ['additional'],
    });
  }

  async findByDish(id: string) {
    const dish = await this.dishService.findOne(id);

    if (!dish) throw new NotFoundException(`Dish with id ${id} not found`);

    return await this.additionalGroupRepository.find({
      where: {
        dish: { id },
      },
      relations: ['additional'],
    });
  }

  private handleDbErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(`Something went wrong`);
  }
}
