import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customers } from './customers.entity';
import { OrderItems } from './order-items.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @ManyToMany(() => Customers, (customer) => customer.orders)
  customer: Customers;

  @OneToMany(() => OrderItems, (item) => item.order)
  items: OrderItems[];
}
