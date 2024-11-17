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
  getHello(): string {
    console.log('get hello!');
    return this.appService.getHello();
  }

  @MessagePattern('create_item')
  createItem(@Body() item: ItemDTO) {
    return this.appService.createItem(item);
  }
}
