import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdditionalsService } from './additionals.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { ValidRoles } from '../users/interfaces';
import { Auth } from '../users/decorators/auth.decorator';

@ApiTags('Additionals')
@Controller('additionals')
export class AdditionalsController {
  constructor(private readonly additionalsService: AdditionalsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createAdditionalDto: CreateAdditionalDto) {
    return this.additionalsService.create(createAdditionalDto);
  }
}
