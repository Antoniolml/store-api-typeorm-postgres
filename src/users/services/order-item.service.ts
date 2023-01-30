import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entity/products.entity';
import { Repository } from 'typeorm';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-items.dto';
import { OrderItems } from '../entity/order-items.entity';
import { Orders } from '../entity/orders.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(OrderItems) private itemRepo: Repository<OrderItems>,
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}

  async create(date: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: date.orderId });

    const product = await this.productRepo.findOneBy({ id: date.productId });

    const item = new OrderItems();

    item.order = order;
    item.product = product;
    item.quantity = date.quantity;
    return this.itemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item #${id} not found`);

    if (changes.orderId) {
      const order = await this.orderRepo.findOneBy({
        id: changes.orderId,
      });
      item.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOneBy({
        id: changes.productId,
      });
      item.product = product;
    }
    this.itemRepo.merge(item, changes);
    return this.itemRepo.save(item);
  }

  remove(id: number) {
    const orderItem = this.itemRepo.findOneBy({ id });
    if (!orderItem) throw new NotFoundException(`Item #${id} not found`);
    return this.itemRepo.delete(id);
  }
}
