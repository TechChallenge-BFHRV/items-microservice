import { Body, Controller, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ItemDTO } from './item.dto';
import { CreateItemUseCase } from './usecases/create-item.usecase';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly createItemUseCase: CreateItemUseCase,
  ) {}

  @EventPattern('get_all_items')
  getHello(): string {
    console.log('get hello!');
    return this.appService.getHello();
  }

  @EventPattern('create_item')
  async createItem(@Body() item: ItemDTO) {
    const itemCreated = await this.createItemUseCase.execute(item);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item created successfully',
      data: itemCreated,
    };
  }
}
