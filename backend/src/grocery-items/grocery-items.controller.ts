import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateGroceryItemDto } from 'ordo-api/dist/create-grocery-item.dto';
import { UpdateGroceryItemDto } from 'ordo-api/dist/update-grocery-item.dto';
import { GroceryItemEntity } from './entities/grocery-item.entity';
import { GroceryItemsService } from './grocery-items.service';

@Controller('grocery-items')
export class GroceryItemsController {
  constructor(private readonly groceryItemsService: GroceryItemsService) {}

  @Post()
  @ApiCreatedResponse({ type: GroceryItemEntity })
  create(@Body() createGroceryItemDto: CreateGroceryItemDto) {
    return this.groceryItemsService.create(createGroceryItemDto);
  }

  @Get()
  @ApiOkResponse({ type: GroceryItemEntity, isArray: true })
  findAll() {
    return this.groceryItemsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GroceryItemEntity })
  findOne(@Param('id') id: string) {
    return this.groceryItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GroceryItemEntity })
  update(
    @Param('id') id: string,
    @Body() updateGroceryItemDto: UpdateGroceryItemDto,
  ) {
    return this.groceryItemsService.update(id, updateGroceryItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: GroceryItemEntity })
  remove(@Param('id') id: string) {
    return this.groceryItemsService.remove(id);
  }
}
