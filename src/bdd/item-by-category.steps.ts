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

const feature = loadFeature('./src/bdd/features/Items.feature');

const itemsArray = [
  {id: 1, name: 'Coke', description: '250ml', price: 10, createdAt: new Date(), updatedAt: new Date(), category: 'BEBIDA', preparationTime: 60},
  {id: 2, name: 'Sprite', description: '250ml', price: 10, createdAt: new Date(), updatedAt: new Date(), category: 'BEBIDA', preparationTime: 60},
  {id: 3, name: 'Fries', description: '300g', price: 15, createdAt: new Date(), updatedAt: new Date(), category: 'ACOMPANHAMENTO', preparationTime: 300},
];

const db = {
  item: {
    findMany: jest.fn().mockResolvedValue(itemsArray),
    create: jest.fn(),
  }
};

defineFeature(feature, test => {
  let getItemsPerCategoryUseCase: GetItemsPerCategoryUseCase;
  let prisma: PrismaService;
  let getItems: GetItemUseCase;

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
    getItemsPerCategoryUseCase = module.get<GetItemsPerCategoryUseCase>(GetItemsPerCategoryUseCase);
    getItems = module.get<GetItemUseCase>(GetItemUseCase);
    prisma = module.get<PrismaService>(PrismaService);
    });

    test('Consult items from a specific Item Category', ({ given, when, then, and }) => {
        given('that the application is running with items in database', async () => {
          const totalItems = await getItems.execute();
          expect(totalItems.length).toBeGreaterThan(0);
        });
        let itemsPerCategory;
        when('the user queries a specific Item Category', async () => {
          itemsPerCategory = await getItemsPerCategoryUseCase.execute('BEBIDA');
        });

        then('the system should output items from the Category selected by the user', () => {
          expect(prisma.item.findMany).toHaveBeenCalledWith({ where: { category: 'BEBIDA' }});
          expect(itemsPerCategory.length).toBeGreaterThan(0);
        });
    });
});