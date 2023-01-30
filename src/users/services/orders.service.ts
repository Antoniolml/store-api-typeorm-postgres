import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdersDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Customers } from '../entity/customers.entity';
import { Orders } from '../entity/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async create(data: CreateOrdersDto) {
    const order = new Orders();
    if (data.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: data.customerId,
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({
      id: changes.customerId,
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);

    if (changes.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: changes.customerId,
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    const order = this.orderRepo.findOneBy({ id });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return this.orderRepo.delete(id);
  }
}
