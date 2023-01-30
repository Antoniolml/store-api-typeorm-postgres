import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomersDto, UpdateCustemerDto } from '../dtos/customers.dto';
import { Customers } from '../entity/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  create(data: CreateCustomersDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustemerDto) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    const customer = this.customerRepo.findOneBy({ id });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return this.customerRepo.delete(id);
  }
}
