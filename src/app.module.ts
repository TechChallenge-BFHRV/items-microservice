import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { GetItemUseCase } from './usecases/get-item.usecase';
import { ItemRepository } from './item.repository';
import { ItemPrismaRepository } from './item.prisma.repository';
import { PrismaService } from './prisma.service';
import { GetItemsPerCategoryUseCase } from './usecases/get-items-per-category.usecase';
import { GetItemByIdUseCase } from './usecases/get-item-by-id.usecase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: ItemRepository,
      useClass: ItemPrismaRepository
    },
    CreateItemUseCase,
    GetItemUseCase,
    GetItemsPerCategoryUseCase,
    GetItemByIdUseCase,
  ],
})
export class AppModule {}
