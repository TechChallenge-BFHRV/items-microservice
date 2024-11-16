import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { ItemRepository } from './item.repository';
import { ItemPrismaRepository } from './item.prisma.repository';
import { PrismaService } from './prisma.service';

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
    CreateItemUseCase
  ],
})
export class AppModule {}
