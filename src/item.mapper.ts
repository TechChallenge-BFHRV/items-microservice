import { Item } from './entities/item.entity';
import { ItemDTO } from './item.dto';
import { ItemData } from './item.interface';

export class ItemMapper {
  public static toEntity(raw: ItemData): Item {
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

  public static toDTO(entity: Item): ItemDTO {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      imageUrl: entity.imageUrl,
      price: entity.price,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      category: entity.category,
      preparationTime: entity.preparationTime,
    };
  }
}
