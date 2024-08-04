import { Module } from '@nestjs/common';
import { ItemTypesService } from './item-types.service';
import { ItemTypesController } from './item-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemTypesController],
  providers: [ItemTypesService],
  imports: [PrismaModule],
})
export class ItemTypesModule { }
