import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({
      id,
    });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  private handleDbErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(`Something went wrong`);
  }
}
