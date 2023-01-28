import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

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
  readonly category: string;
}

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
