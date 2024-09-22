import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { UpdateGroceryItemDto } from './dto/update-grocery-item.dto';

@Injectable()
export class GroceryItemsService {
  constructor(private prisma: PrismaService) {}

  create(createGroceryItemDto: CreateGroceryItemDto) {
    return this.prisma.groceryListItem.create({ data: createGroceryItemDto });
  }

  findAll() {
    return this.prisma.groceryListItem.findMany();
  }

  findOne(id: string) {
    return this.prisma.groceryListItem.findUnique({ where: { id } });
  }

  update(id: string, updateGroceryItemDto: UpdateGroceryItemDto) {
    return this.prisma.groceryListItem.update({
      where: { id },
      data: updateGroceryItemDto,
    });
  }

  remove(id: string) {
    return this.prisma.groceryListItem.delete({ where: { id } });
  }
}
