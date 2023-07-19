import { Test, TestingModule } from '@nestjs/testing';
import { PizzaIncredientsResolver } from './pizza-incredients.resolver';

describe('PizzaIncredientsResolver', () => {
  let resolver: PizzaIncredientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzaIncredientsResolver],
    }).compile();

    resolver = module.get<PizzaIncredientsResolver>(PizzaIncredientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
