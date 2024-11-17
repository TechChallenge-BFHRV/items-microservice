import { ItemPrismaRepository } from './item.prisma.repository';
import { PrismaService } from './prisma.service';
import mockPrismaClient from '../test/prisma.mock';
import { ItemCategory } from './entities/item-categories.entity';

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient)
  }));

describe('ItemPrismaRepository', () => {
  let repository: ItemPrismaRepository;
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
    repository = new ItemPrismaRepository(new PrismaService);
  });

  describe('getItemsPerCategory', () => {
    it('should return items for a given category', async () => {
      const category = 'BEBIDA';
      const mockItems = [
        { id: 1, name: 'Coca', description: 'A good coca', category: 'BEBIDA' },
        { id: 2, name: 'Fanta', description: 'A good fanta', category: 'BEBIDA' },
      ];

      mockPrismaClient.item.findMany.mockResolvedValue(mockItems);

      const result = await repository.getItemsPerCategory(category);

      expect(mockPrismaClient.item.findMany).toHaveBeenCalledWith({
        where: { category },
      });
      expect(result).toEqual(mockItems);
    });

    it('should return an empty array if no items are found', async () => {
        mockPrismaClient.item.findMany.mockResolvedValue([]);

      const result = await repository.getItemsPerCategory('SOBREMESA');

      expect(mockPrismaClient.item.findMany).toHaveBeenCalledWith({
        where: { category: 'SOBREMESA' },
      });
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new item', async () => {
      mockPrismaClient.item.create.mockResolvedValue(sampleItem);

      const result = await repository.create(sampleItem);

      expect(mockPrismaClient.item.create).toHaveBeenCalledWith({
        data: sampleItem,
      });
      expect(result).toEqual(sampleItem);
    });
  });

  describe('getAll', () => {
    it('should return all items', async () => {
      const mockItems = [
        { id: 1, name: 'Coca', description: 'A good coca', category: 'BEBIDA' },
        { id: 2, name: 'Fanta', description: 'A good fanta', category: 'BEBIDA' },
      ];

      mockPrismaClient.item.findMany.mockResolvedValue(mockItems);

      const result = await repository.getAll();

      expect(mockPrismaClient.item.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockItems);
    });

    it('should return an empty array if no items exist', async () => {
      mockPrismaClient.item.findMany.mockResolvedValue([]);

      const result = await repository.getAll();

      expect(mockPrismaClient.item.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});