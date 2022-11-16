import { Module } from '@nestjs/common';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [DishesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
