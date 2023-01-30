import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
} from '../dtos/categories.dto';
import { Categories } from '../entity/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories) private categoryRepo: Repository<Categories>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(data: CreateCategoriesDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoriesDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    const category = this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return this.categoryRepo.delete(id);
  }
}
