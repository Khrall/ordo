import { ApiProperty } from "@nestjs/swagger";

export class CreateItemTypeDto {
    @ApiProperty()
    name: string;
}
