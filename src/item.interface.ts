import { ItemCategory } from './entities/item-categories.entity';

export interface ItemData {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category: ItemCategory;
  preparationTime: number;
}
