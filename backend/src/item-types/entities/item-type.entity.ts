import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from '@prisma/client';

export class ItemTypeEntity implements ItemType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  amountMetric: string;

  @ApiProperty()
  amountMultiplier: number;
}
