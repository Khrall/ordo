import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroceryItemsController } from './grocery-items.controller';
import { GroceryItemsService } from './grocery-items.service';

@Module({
  controllers: [GroceryItemsController],
  providers: [GroceryItemsService],
  imports: [PrismaModule],
})
export class GroceryItemsModule {}
