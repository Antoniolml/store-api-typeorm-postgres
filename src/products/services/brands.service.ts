import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandsDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brands } from '../entity/brands.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands) private brandRepo: Repository<Brands>,
  ) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!brand)
      throw new NotFoundException(`Brand #${id} not 
    found`);
    return brand;
  }

  create(data: CreateBrandsDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) throw new NotFoundException(`brand #${id} not found`);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    const brand = this.brandRepo.findOne({ where: { id } });
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return this.brandRepo.delete(id);
  }
}
