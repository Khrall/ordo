import { Test, TestingModule } from '@nestjs/testing';
import { GroceryItemsController } from './grocery-items.controller';
import { GroceryItemsService } from './grocery-items.service';

describe('GroceryItemsController', () => {
  let controller: GroceryItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryItemsController],
      providers: [GroceryItemsService],
    }).compile();

    controller = module.get<GroceryItemsController>(GroceryItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
