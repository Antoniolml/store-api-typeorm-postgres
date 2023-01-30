import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { Customers } from './entity/customers.entity';
import { OrderItems } from './entity/order-items.entity';
import { Orders } from './entity/orders.entity';
import { Users } from './entity/users.entity';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customers, Users, Orders, OrderItems]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
})
export class UsersModule {}
