import { Item } from './entities/item.entity';
import { Item as PrismaItem } from '@prisma/client';

export class ItemPrismaMapper {
  public static toEntity(raw: PrismaItem): Item {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      imageUrl: raw.imageUrl,
      price: raw.price,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      category: raw.category,
      preparationTime: raw.preparationTime,
    };
  }

  public static toPrisma(raw: Item): PrismaItem {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      imageUrl: raw.imageUrl,
      price: raw.price,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      category: raw.category,
      preparationTime: raw.preparationTime,
    } as PrismaItem;
  }
}
