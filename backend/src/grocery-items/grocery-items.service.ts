import { Injectable } from '@nestjs/common';
import { CreateGroceryItemDto } from 'ordo-api/dist/create-grocery-item.dto';
import { UpdateGroceryItemDto } from 'ordo-api/dist/update-grocery-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroceryItemsService {
  constructor(private prisma: PrismaService) {}

  create(createGroceryItemDto: CreateGroceryItemDto) {
    return this.prisma.groceryListItem.create({
      data: createGroceryItemDto,
      include: { type: true },
    });
  }

  findAll() {
    return this.prisma.groceryListItem.findMany({ include: { type: true } });
  }

  findOne(id: string) {
    return this.prisma.groceryListItem.findUnique({
      where: { id },
      include: { type: true },
    });
  }

  update(id: string, updateGroceryItemDto: UpdateGroceryItemDto) {
    return this.prisma.groceryListItem.update({
      where: { id },
      data: updateGroceryItemDto,
      include: { type: true },
    });
  }

  remove(id: string) {
    return this.prisma.groceryListItem.delete({
      where: { id },
      include: { type: true },
    });
  }
}
