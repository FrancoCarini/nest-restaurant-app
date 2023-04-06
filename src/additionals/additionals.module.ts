import { Module } from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { AdditionalsController } from './additionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Additional } from './entities/additional.entity';
import { UsersModule } from '../users/users.module';
import { AdditionalgroupsModule } from '../additionalgroups/additionalgroups.module';

@Module({
  controllers: [AdditionalsController],
  providers: [AdditionalsService],
  imports: [
    TypeOrmModule.forFeature([Additional]),
    UsersModule,
    AdditionalgroupsModule,
  ],
})
export class AdditionalsModule {}
