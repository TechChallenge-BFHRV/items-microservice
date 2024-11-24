import { IUseCase } from './usecase';
import { ItemRepository } from '../item.repository';
import { Item } from '../entities/item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetItemByIdUseCase implements IUseCase<Item> {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: number): Promise<Item> {
    const item = await this.itemRepository.getById(id);
    return item;
  }
}
