import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ItemDTO } from './item.dto';
import { ItemCategory } from './entities/item-categories.entity';

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

  @MessagePattern('get_items_per_category')
  getItemsPerCategory(category: ItemCategory) {
    console.log('message pattern claled with category' , category);
    return this.appService.getItemsPerCategory(category);
  }

  @MessagePattern('get_item_by_id')
  getItemById(id: number) {
    return this.appService.getItemById(id);
  }
}
