import { Injectable } from '@nestjs/common';
import { Pizza } from './entities/pizza.entity/pizza.entity';
import { PizzaInput } from './dto/pizza.input/pizza.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdatePizzaInput } from './dto/update-pizza.input/update-pizza.input';
import { Incredient } from './entities/incredient.entity/incredient.entity';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>,
    @InjectRepository(Incredient)
    private IncredientRepository: Repository<Incredient>,
  ) {}
  async findAll(): Promise<Pizza[]> {
    return this.pizzaRepository.find();
  }
  async findOne(id: number): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOne({ where: { id } });
    if (!pizza) {
      throw new UserInputError(`Pizza with id: ${id} does not exist`);
    }
    return pizza;
  }

  async create(createPizzaInput: PizzaInput): Promise<Pizza> {
    const incredients = await Promise.all(
      createPizzaInput.incredients.map((name) =>
        this.preloadIncredientByName(name),
      ),
    );
    const pizza = this.pizzaRepository.create({
      ...createPizzaInput,
      incredients,
    });
    return this.pizzaRepository.save(pizza);
  }
  async update(id: number, updatePizzaInput: UpdatePizzaInput): Promise<Pizza> {
    const incredients =
      updatePizzaInput.incredients &&
      (await Promise.all(
        updatePizzaInput.incredients.map((name) =>
          this.preloadIncredientByName(name),
        ),
      ));
    const updatedPizza = await this.pizzaRepository.preload({
      id,
      ...updatePizzaInput,
      incredients,
    });
    if (!updatedPizza) {
      throw new UserInputError(`Pizza with id: ${id} does not exist`);
    }
    return this.pizzaRepository.save(updatedPizza);
  }

  async delete(id: number): Promise<Pizza> {
    const pizza = await this.findOne(id);
    return this.pizzaRepository.remove(pizza);
  }

  async preloadIncredientByName(name: string): Promise<Incredient> {
    const existingIncredient = await this.IncredientRepository.findOne({
      where: { name },
    });
    console.log(name);
    if (existingIncredient) {
      return existingIncredient;
    }
    return this.IncredientRepository.create({ name });
  }
}
