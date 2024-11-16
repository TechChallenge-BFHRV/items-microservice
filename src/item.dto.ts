import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategory } from './entities/item-categories.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    enum: ItemCategory,
  })
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @ApiProperty()
  @IsNumber()
  preparationTime: number;

  @ApiPropertyOptional()
  imageUrl?: string;
}
