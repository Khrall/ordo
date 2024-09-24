import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemTypeDto {
  @ApiProperty({
    description: 'Name of the item type',
    example: 'Milk',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Metric for the item amount (e.g., "stk", "kg")',
    example: 'stk',
  })
  @IsString()
  @IsNotEmpty()
  amountMetric: string;

  @ApiProperty({
    description: 'Multiplier used for the amount of the item',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  amountMultiplier: number;
}
