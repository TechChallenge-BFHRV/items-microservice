import { HttpStatus, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { GetItemUseCase } from './usecases/get-item.usecase';
@Injectable()
export class AppService {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemUseCase: GetItemUseCase,
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
}
