import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'the product id of order item' })
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'the productId of order item' })
  readonly productId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'the quantity of order item' })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
