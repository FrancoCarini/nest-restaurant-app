import { PartialType } from '@nestjs/mapped-types';
import { CreateAdditionalgroupDto } from './create-additionalgroup.dto';

export class UpdateAdditionalgroupDto extends PartialType(CreateAdditionalgroupDto) {}
