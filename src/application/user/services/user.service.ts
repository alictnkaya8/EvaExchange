import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async getCash(userId: string, cash: string) {
    try {
      const user = await this.getById(userId);
      user.cash = (+user.cash + +cash).toString();
      await this.userRepository.save(user);
      return `Add ${cash} in your account.`;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('cash not added');
    }
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async getById(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
