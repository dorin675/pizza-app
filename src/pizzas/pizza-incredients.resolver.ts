import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Pizza } from './entities/pizza.entity/pizza.entity';
import { Incredient } from './entities/incredient.entity/incredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Pizza)
export class PizzaIncredientsResolver {
  constructor(
    @InjectRepository(Incredient)
    private incredientRepository: Repository<Incredient>,
  ) {}
  @ResolveField('incredients', () => [Incredient])
  async getIncredientsOfPizza(@Parent() pizza: Pizza) {
    return this.incredientRepository
      .createQueryBuilder('incredient')
      .innerJoin('incredient.pizzas', 'pizza', 'pizza.id = :pizzaId', {
        pizzaId: pizza.id,
      })
      .getMany();
  }
}
