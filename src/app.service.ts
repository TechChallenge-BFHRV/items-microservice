import { HttpStatus, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { GetItemUseCase } from './usecases/get-item.usecase';
import { ItemCategory } from './entities/item-categories.entity';
import { GetItemsPerCategoryUseCase } from './usecases/get-items-per-category.usecase';
import { GetItemByIdUseCase } from './usecases/get-item-by-id.usecase';
@Injectable()
export class AppService {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly getItemsPerCategoryUseCase: GetItemsPerCategoryUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
  ) {}
  async getAllItems() {
    const allItems = await this.getItemUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'All items retrieved successfully',
      data: allItems,
    };
  }

  async createItem(item: Item) {
    const itemCreated = await this.createItemUseCase.execute(item);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item created successfully',
      data: itemCreated,
    };
  }

  async getItemsPerCategory(category: ItemCategory) {
    const categoryItems = await this.getItemsPerCategoryUseCase.execute(category);
    return {
      statusCode: HttpStatus.OK,
      message: `${category} items retrieved successfully. Total: ${categoryItems.length}`,
      data: categoryItems,
    };
  }

  async getItemById(id: number) {
    const item = await this.getItemByIdUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Item with id ${id} retrieved succesfully.`,
      data: item,
    };
  }
}
