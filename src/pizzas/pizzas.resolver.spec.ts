import { Test, TestingModule } from '@nestjs/testing';
import { PizzasResolver } from './pizzas.resolver';

describe('PizzasResolver', () => {
  let resolver: PizzasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzasResolver],
    }).compile();

    resolver = module.get<PizzasResolver>(PizzasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
