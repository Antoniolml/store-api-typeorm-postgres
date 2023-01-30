import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `product's stock` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `product's image` })
  image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `product's brand id` })
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: `product's brand id` })
  readonly categoriesId: number[];
}

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
