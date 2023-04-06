import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfiguration } from './config/env.config';
import { DishesModule } from './dishes/dishes.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AdditionalgroupsModule } from './additionalgroups/additionalgroups.module';
import { AdditionalsModule } from './additionals/additionals.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DishesModule,
    UsersModule,
    CategoriesModule,
    AdditionalgroupsModule,
    AdditionalsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
