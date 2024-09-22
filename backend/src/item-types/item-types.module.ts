import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemTypesController } from './item-types.controller';
import { ItemTypesService } from './item-types.service';

@Module({
  controllers: [ItemTypesController],
  providers: [ItemTypesService],
  imports: [PrismaModule],
})
export class ItemTypesModule {}
