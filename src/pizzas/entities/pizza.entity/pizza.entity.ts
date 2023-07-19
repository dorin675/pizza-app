import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Incredient } from '../incredient.entity/incredient.entity';

@ObjectType({ description: 'Pizza model' })
@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany((type) => Incredient, (incredient) => incredient.pizzas, {
    cascade: true,
  })
  incredients?: Incredient[];

  @Column()
  price: number;

  @Column()
  weight: number;
}
