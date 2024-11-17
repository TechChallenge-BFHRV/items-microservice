import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { ItemRepository } from './item.repository';
import { ItemPrismaRepository } from './item.prisma.repository';
import { PrismaService } from './prisma.service';
import { GetItemUseCase } from './usecases/get-item.usecase';

jest.mock('@prisma/client', () => {
  return {
    ...jest.requireActual('@prisma/client'),
    PrismaClient: jest.requireActual('prismock').PrismockClient,
  };
});

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService, CreateItemUseCase, GetItemUseCase, { provide: ItemRepository, useClass: ItemPrismaRepository }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return getAllItems response with empty data', async () => {
      expect(appController.getAllItems()).resolves.toStrictEqual({
        data: [],
        message: 'All items retrieved successfully',
        statusCode: 200,
      });
    });
  });
});
