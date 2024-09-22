import { ApiProperty } from '@nestjs/swagger';
import { GroceryListItem } from '@prisma/client';

export class GroceryItemEntity implements GroceryListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  typeId: string;

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
