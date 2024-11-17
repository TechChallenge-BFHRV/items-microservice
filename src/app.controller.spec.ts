import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { ItemRepository } from './item.repository';
import { ItemPrismaRepository } from './item.prisma.repository';
import { PrismaService } from './prisma.service';
import mockPrismaClient from '../test/prisma.mock';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient)
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService, CreateItemUseCase, { provide: ItemRepository, useClass: ItemPrismaRepository }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllItems()).toBe('Hello Worldsy!');
    });
  });
});
