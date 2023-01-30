import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-items.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.itemsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id);
  }
}
