import { IUseCase } from './usecase';
import { ItemRepository } from '../item.repository';
import { Item } from '../entities/item.entity';
import { Injectable } from '@nestjs/common';
import { ItemDTO } from '../item.dto';
import { ItemMapper } from '../item.mapper';

@Injectable()
export class GetItemUseCase implements IUseCase<Item> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<ItemDTO[]> {
    const items = await this.itemRepository.getAll();
    return items.map((x) => ItemMapper.toDTO(x));
  }
}
