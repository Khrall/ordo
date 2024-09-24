import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateGroceryItemDto {
  @ApiProperty({
    description: "ID of the item type",
    example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
  })
  @IsUUID()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty({
    description: "Status of the grocery item",
    example: "todo",
    enum: ["todo", "bought"],
  })
  @IsString()
  @IsNotEmpty()
  status: string; // "todo", "picked up", "bought"

  @ApiProperty({
    description: "Amount of the grocery item",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: "Date and time when the item was bought",
    example: "2024-08-05T14:48:00.000Z",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  boughtAt?: Date;
}
