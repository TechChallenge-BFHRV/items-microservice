import { HttpStatus, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemUseCase } from './usecases/create-item.usecase';
@Injectable()
export class AppService {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
  ) {}
  getHello(): string {
    return 'Hello Worldsy!';
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
