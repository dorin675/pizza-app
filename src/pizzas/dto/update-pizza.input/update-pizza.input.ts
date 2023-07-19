import { InputType, PartialType } from '@nestjs/graphql';
import { PizzaInput } from '../pizza.input/pizza.input';

@InputType()
export class UpdatePizzaInput extends PartialType(PizzaInput) {}
