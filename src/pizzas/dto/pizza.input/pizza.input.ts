import { InputType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';
import { Incredient } from 'src/pizzas/entities/incredient.entity/incredient.entity';

@InputType()
export class PizzaInput {
  @MinLength(3)
  name: string;
  incredients: string[];
  @IsNumber()
  price: number;
  @IsNumber()
  weight: number;
}
