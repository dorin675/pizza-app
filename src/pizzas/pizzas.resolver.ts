import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pizza } from './entities/pizza.entity/pizza.entity';
import { ParseIntPipe } from '@nestjs/common';
import { PizzaInput } from './dto/pizza.input/pizza.input';
import { PizzasService } from './pizzas.service';
import { UpdatePizzaInput } from './dto/update-pizza.input/update-pizza.input';

@Resolver()
export class PizzasResolver {
  constructor(private pizzaService: PizzasService) {}
  @Query(() => [Pizza], { name: 'pizzas' })
  async findAll(): Promise<Pizza[]> {
    return this.pizzaService.findAll();
  }
  @Query(() => Pizza, { name: 'pizza' })
  async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Pizza> {
    return this.pizzaService.findOne(id);
  }

  @Mutation(() => Pizza, { name: 'createPizza' })
  async create(
    @Args('createPizzaInput') createPizzaInput: PizzaInput,
  ): Promise<Pizza> {
    return this.pizzaService.create(createPizzaInput);
  }

  @Mutation(() => Pizza, { name: 'updatePizza' })
  async update(
    @Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Pizza> {
    return this.pizzaService.update(id, updatePizzaInput);
  }

  @Mutation(() => Pizza, { name: 'deletePizza' })
  async delete(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Pizza> {
    return this.pizzaService.delete(id);
  }
}
