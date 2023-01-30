import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { Customers } from '../entity/customers.entity';
import { Users } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customers'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: data.customerId,
      });
      newUser.customers = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return this.userRepo.delete(id);
  }
}
