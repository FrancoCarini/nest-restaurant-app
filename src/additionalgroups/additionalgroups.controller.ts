import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ValidRoles } from '../users/interfaces';
import { Auth } from '../users/decorators/auth.decorator';
import { AdditionalgroupsService } from './additionalgroups.service';
import { CreateAdditionalgroupDto } from './dto/create-additionalgroup.dto';

@ApiTags('Additional Groups')
@Controller('additionalgroups')
export class AdditionalgroupsController {
  constructor(
    private readonly additionalgroupsService: AdditionalgroupsService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createAdditionalgroupDto: CreateAdditionalgroupDto) {
    return this.additionalgroupsService.create(createAdditionalgroupDto);
  }

  @Get()
  findAll() {
    return this.additionalgroupsService.findAll();
  }

  @Get('/dish/:id')
  findByDish(@Param('id', ParseUUIDPipe) id: string) {
    return this.additionalgroupsService.findByDish(id);
  }
}
