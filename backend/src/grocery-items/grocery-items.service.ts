import { Injectable } from '@nestjs/common';
import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { UpdateGroceryItemDto } from './dto/update-grocery-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroceryItemsService {
  constructor(private prisma: PrismaService) { }

  create(createGroceryItemDto: CreateGroceryItemDto) {
    return 'This action adds a new groceryItem';
  }

  findAll() {
    return `This action returns all groceryItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groceryItem`;
  }

  update(id: number, updateGroceryItemDto: UpdateGroceryItemDto) {
    return `This action updates a #${id} groceryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} groceryItem`;
  }
}
