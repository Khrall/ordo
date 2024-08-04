import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GroceryItemsModule } from './grocery-items/grocery-items.module';
import { ItemTypesModule } from './item-types/item-types.module';

@Module({
  imports: [PrismaModule, GroceryItemsModule, ItemTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
