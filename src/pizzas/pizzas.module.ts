import { Module } from '@nestjs/common';
import { PizzasResolver } from './pizzas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity/pizza.entity';
import { PizzasService } from './pizzas.service';
import { Incredient } from './entities/incredient.entity/incredient.entity';
import { PizzaIncredientsResolver } from './pizza-incredients.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Incredient])],
  providers: [PizzasResolver, PizzasService, PizzaIncredientsResolver],
})
export class PizzasModule {}
