import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('get-cash')
  getCash(@Body('cash') cash: string, @GetUser() user: User) {
    return this.userService.getCash(user.id, cash);
  }
}
