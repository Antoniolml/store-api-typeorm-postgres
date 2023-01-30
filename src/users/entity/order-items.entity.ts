import { Products } from 'src/products/entity/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class OrderItems {
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

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Products)
  product: Products;

  @ManyToOne(() => Orders, (order) => order.items)
  order: Orders;
}
