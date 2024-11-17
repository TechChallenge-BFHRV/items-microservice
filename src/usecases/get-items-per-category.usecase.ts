import { IUseCase } from './usecase';
import { ItemRepository } from '../item.repository';
import { Item } from '../entities/item.entity';
import { ItemCategory } from '../entities/item-categories.entity';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from '../item.dto';
import { ItemMapper } from '../item.mapper';

@Injectable()
export class GetItemsPerCategoryUseCase implements IUseCase<Item[]> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(category: ItemCategory): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getItemsPerCategory(category);
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
