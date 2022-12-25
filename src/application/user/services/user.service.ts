import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  onModuleInit() {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async getById(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
