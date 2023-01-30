import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { Brands } from '../entity/brands.entity';
import { Categories } from '../entity/categories.entity';
import { Products } from '../entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
    @InjectRepository(Brands) private brandRepo: Repository<Brands>,
    @InjectRepository(Categories) private categoryRepo: Repository<Categories>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async create(data: CreateProductsDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: data.brandId });
      newProduct.brand = brand;
    }

    if (data.categoriesId) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesId),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductsDto) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: changes.brandId });
      product.brand = brand;
    }

    if (changes.categoriesId) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesId),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);

    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);

    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    const product = this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return this.productRepo.delete(id);
  }
}
