import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrdersDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'the customer id of order' })
  customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrdersDto) {}
