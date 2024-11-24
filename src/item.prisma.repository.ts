import { Injectable } from '@nestjs/common';
import { ItemCategory } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ItemRepository } from './item.repository';
import { Item } from './entities/item.entity';
import { ItemPrismaMapper } from './item.prisma.mapper';

@Injectable()
export class ItemPrismaRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getItemsPerCategory(category: ItemCategory): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        category: category,
      },
    });
    return items;
  }

  async create(item: Item): Promise<Item> {
    const createdItem = await this.prisma.item.create({
      data: {
        ...ItemPrismaMapper.toPrisma(item),
      },
    });

    return ItemPrismaMapper.toEntity(createdItem);
  }

  update(id: number, data: Item): Promise<Item> {
    throw new Error('Method not implemented.');
  }

  async getById(id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id: id },
    });
    if (!item) throw new Error('Item not found!');
    return item;
  }

  async getAll(): Promise<Item[]> {
    const items = await this.prisma.item.findMany();
    return items.map((item) => ItemPrismaMapper.toEntity(item));
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
