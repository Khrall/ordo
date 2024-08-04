import { Test, TestingModule } from '@nestjs/testing';
import { GroceryItemsService } from './grocery-items.service';

describe('GroceryItemsService', () => {
  let service: GroceryItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroceryItemsService],
    }).compile();

    service = module.get<GroceryItemsService>(GroceryItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
