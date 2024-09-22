import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { ItemTypeEntity } from './entities/item-type.entity';
import { ItemTypesService } from './item-types.service';

@Controller('item-types')
@ApiTags('item types')
export class ItemTypesController {
  constructor(private readonly itemTypesService: ItemTypesService) {}

  @Post()
  @ApiCreatedResponse({ type: ItemTypeEntity })
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypesService.create(createItemTypeDto);
  }

  @Get()
  @ApiOkResponse({ type: ItemTypeEntity, isArray: true })
  findAll() {
    return this.itemTypesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ItemTypeEntity })
  findOne(@Param('id') id: string) {
    return this.itemTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ItemTypeEntity })
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypesService.update(id, updateItemTypeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ItemTypeEntity })
  remove(@Param('id') id: string) {
    return this.itemTypesService.remove(id);
  }
}
