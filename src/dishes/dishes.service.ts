import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';

import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createDishDto: CreateDishDto) {
    try {
      const { categoryId } = createDishDto;
      // Check if Category exists
      const category = await this.categoryService.findOne(categoryId);

      // Create Dish
      const dish = this.dishRepository.create({
        ...createDishDto,
        category,
      });
      return await this.dishRepository.save(dish);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  findAll() {
    return `This action returns all dishes`;
  }

  async findOne(id: string) {
    const dish = await this.dishRepository.findOneBy({
      id,
    });
    if (!dish) throw new NotFoundException(`Dish with id ${id} not found`);

    return dish;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }

  private handleDbErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(`Something went wrong`);
  }
}
