import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Brands } from './entity/brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Brands])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [BrandsService, ProductsService, CategoriesService],
})
export class ProductsModule {}
