import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@Injectable()
export class ItemTypesService {
  constructor(private prisma: PrismaService) {}

  create(createItemTypeDto: CreateItemTypeDto) {
    return this.prisma.itemType.create({ data: createItemTypeDto });
  }

  findAll() {
    return this.prisma.itemType.findMany();
  }

  findOne(id: string) {
    return this.prisma.itemType.findUnique({ where: { id } });
  }

  update(id: string, updateItemTypeDto: UpdateItemTypeDto) {
    return this.prisma.itemType.update({
      where: { id },
      data: updateItemTypeDto,
    });
  }

  remove(id: string) {
    return this.prisma.itemType.delete({ where: { id } });
  }
}
