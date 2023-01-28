import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { Products } from '../entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(data: CreateProductsDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductsDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const deleteProduct = this.productRepo.findOneBy({ id });
    if (!deleteProduct) throw new NotFoundException(`Product #${id} not found`);
    return this.productRepo.delete(id);
  }
}
