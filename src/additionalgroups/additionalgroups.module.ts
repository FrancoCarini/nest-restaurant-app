import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdditionalgroupsService } from './additionalgroups.service';
import { AdditionalgroupsController } from './additionalgroups.controller';
import { Additionalgroup } from './entities/additionalgroup.entity';
import { UsersModule } from '../users/users.module';
import { DishesModule } from 'src/dishes/dishes.module';

@Module({
  controllers: [AdditionalgroupsController],
  providers: [AdditionalgroupsService],
  imports: [
    TypeOrmModule.forFeature([Additionalgroup]),
    UsersModule,
    DishesModule,
  ],
  exports: [AdditionalgroupsService],
})
export class AdditionalgroupsModule {}
