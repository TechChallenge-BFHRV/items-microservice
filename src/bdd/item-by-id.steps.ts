import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { GetItemsPerCategoryUseCase } from '../usecases/get-items-per-category.usecase';
import { ItemRepository } from '../item.repository';
import { ItemPrismaRepository } from '../item.prisma.repository';
import { PrismaService } from '../prisma.service';
import { AppService } from '../app.service';
import { CreateItemUseCase } from '../usecases/create-item.usecase';
import { GetItemUseCase } from '../usecases/get-item.usecase';
import { GetItemByIdUseCase } from '../usecases/get-item-by-id.usecase';
import { itemsArray } from './items-response-mock';

const feature = loadFeature('./src/bdd/features/ItemPerId.feature');

const db = {
  item: {
    create: jest.fn(),
    findMany: jest.fn().mockResolvedValue(itemsArray),
    findUnique: jest.fn().mockResolvedValue(itemsArray[1])
  }
};

defineFeature(feature, test => {
  let getItemsPerCategoryUseCase: GetItemsPerCategoryUseCase;
  let prisma: PrismaService;
  let getItems: GetItemUseCase;
  let getItemByIdUseCase: GetItemByIdUseCase;

  beforeAll(async () => {

});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        GetItemsPerCategoryUseCase,
        {
          provide: ItemRepository,
          useClass: ItemPrismaRepository,
        },
        AppService,
        {
          provide: PrismaService,
          useValue: db,
        },
        CreateItemUseCase,
        GetItemUseCase,
        GetItemByIdUseCase,
      ]
    }).compile();
    getItemByIdUseCase = module.get<GetItemByIdUseCase>(GetItemByIdUseCase);
    getItemsPerCategoryUseCase = module.get<GetItemsPerCategoryUseCase>(GetItemsPerCategoryUseCase);
    getItems = module.get<GetItemUseCase>(GetItemUseCase);
    prisma = module.get<PrismaService>(PrismaService);
    });

    test('User will enter in the Item details page', ({ given, when, then, and }) => {
        given('that the application is running with items in database', async () => {
          const totalItems = await getItems.execute();
          expect(totalItems.length).toBeGreaterThan(0);
        });
        let itemById;
        when('the user queries a specific Item', async () => {
          itemById = await getItemByIdUseCase.execute(2);
        });

        then('the system should output the retrieved item', () => {
          expect(prisma.item.findUnique).toHaveBeenCalledWith({ where: { id: 2 }});
          expect(itemById.id).toBe(2);
        });
    });
});