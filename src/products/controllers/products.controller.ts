import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  get() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param(':id') id: number, @Body() payload: UpdateProductsDto) {
    return this.productsService.update(id, payload);
  }
}
