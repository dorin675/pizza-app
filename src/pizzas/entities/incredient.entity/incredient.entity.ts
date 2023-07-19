import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pizza } from '../pizza.entity/pizza.entity';

@ObjectType()
@Entity()
export class Incredient {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Pizza, (pizza) => pizza.incredients)
  pizzas: Pizza[];
}
