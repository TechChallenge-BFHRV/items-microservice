import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ItemDTO } from './item.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @MessagePattern('get_all_items')
  getAllItems() {
    return this.appService.getAllItems();
  }

  @MessagePattern('create_item')
  createItem(@Body() item: ItemDTO) {
    return this.appService.createItem(item);
  }
}
