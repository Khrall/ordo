import { ApiProperty } from '@nestjs/swagger';
import { GroceryListItem } from '@prisma/client';
import { ItemTypeEntity } from 'src/item-types/entities/item-type.entity';

export class GroceryItemEntity implements GroceryListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  typeId: string;

  @ApiProperty()
  type: ItemTypeEntity;

  @ApiProperty()
  status: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  boughtAt: Date | null;
}
