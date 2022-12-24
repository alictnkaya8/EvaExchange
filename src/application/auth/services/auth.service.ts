import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../application/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../../application/user/dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../../../application/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.getByUsername(username);
    if (!user) {
      throw new BadRequestException('There is no user with this credentials!');
    }

    const passMatch = await this.comparePassword(pass, user.password);
    if (!passMatch) {
      throw new BadRequestException('There is no user with this credentials!');
    }

    return user;
  }

  async login(userDto: CreateUserDto) {
    const { username, password } = userDto;

    const validatedUser = await this.validateUser(username, password);

    const token = await this.generateToken(validatedUser.username);

    return { token };
  }

  async register(userDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(userDto.password);

    try {
      const newUser = await this.userService.create({
        ...userDto,
        password: hashedPassword,
      });

      const token = this.generateToken(newUser);

      return token;
    } catch (err) {
      if (err?.code == '23505') {
        throw new BadRequestException(
          'User with this credentials already exist!',
        );
      }
      console.log(err);

      throw new BadRequestException('Something went wrong!');
    }
  }

  private generateToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, password: string) {
    const passMatch = await bcrypt.compare(enteredPassword, password);
    return passMatch;
  }
}
