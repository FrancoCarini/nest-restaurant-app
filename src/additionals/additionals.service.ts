import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdditionalgroupsService } from '../additionalgroups/additionalgroups.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { Additional } from './entities/additional.entity';

@Injectable()
export class AdditionalsService {
  constructor(
    @InjectRepository(Additional)
    private readonly additionalRepository: Repository<Additional>,
    private readonly additionalGroupService: AdditionalgroupsService,
  ) {}

  async create(createAdditionalDto: CreateAdditionalDto) {
    try {
      const { additionalGroupId } = createAdditionalDto;
      // Check if additionalGroup exists
      const additionalgroup = await this.additionalGroupService.findOne(
        additionalGroupId,
      );

      const additional = this.additionalRepository.create({
        ...createAdditionalDto,
        additionalgroup,
      });

      return await this.additionalRepository.save(additional);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  private handleDbErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(`Something went wrong`);
  }
}
