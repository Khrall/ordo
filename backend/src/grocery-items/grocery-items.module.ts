import { Module } from '@nestjs/common';
import { GroceryItemsService } from './grocery-items.service';
import { GroceryItemsController } from './grocery-items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GroceryItemsController],
  providers: [GroceryItemsService],
  imports: [PrismaModule],
})
export class GroceryItemsModule { }
