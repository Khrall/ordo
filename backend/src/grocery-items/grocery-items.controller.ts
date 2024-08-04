import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroceryItemsService } from './grocery-items.service';
import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { UpdateGroceryItemDto } from './dto/update-grocery-item.dto';

@Controller('grocery-items')
export class GroceryItemsController {
  constructor(private readonly groceryItemsService: GroceryItemsService) {}

  @Post()
  create(@Body() createGroceryItemDto: CreateGroceryItemDto) {
    return this.groceryItemsService.create(createGroceryItemDto);
  }

  @Get()
  findAll() {
    return this.groceryItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceryItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroceryItemDto: UpdateGroceryItemDto) {
    return this.groceryItemsService.update(+id, updateGroceryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groceryItemsService.remove(+id);
  }
}
