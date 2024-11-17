import { CreateItemUseCase } from './create-item.usecase';
import { ItemPrismaRepository } from '../item.prisma.repository';
import { ItemCategory } from '../entities/item-categories.entity';

describe('CreateItemUseCase', () => {
  let createItemUseCase: CreateItemUseCase;
  let mockItemRepository: jest.Mocked<ItemPrismaRepository>;

  const sampleItem = {
    id: 1,
    name: 'Test Item',
    description: 'This is a test item',
    price: 300,
    preparationTime: 400,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: 'BEBIDA' as ItemCategory,
  };

  beforeEach(() => {
    mockItemRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<ItemPrismaRepository>;
    createItemUseCase = new CreateItemUseCase(mockItemRepository);
  });

  it('should create an item successfully', async () => {
    mockItemRepository.create.mockResolvedValue(sampleItem);
    const result = await createItemUseCase.execute(sampleItem);
    expect(mockItemRepository.create).toHaveBeenCalledWith(sampleItem);
    expect(result).toEqual(sampleItem);
  });

});