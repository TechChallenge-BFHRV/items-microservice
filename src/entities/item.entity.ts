import { ItemCategory } from './item-categories.entity';
export class Item {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category: ItemCategory;
  preparationTime: number;
  constructor({
    id,
    name,
    description,
    imageUrl,
    price,
    createdAt,
    updatedAt,
    category,
    preparationTime = 0,
  }: {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    category: ItemCategory;
    preparationTime?: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.category = category;
    this.preparationTime = preparationTime || 0;
  }
}
