import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShareService } from '../services/share.service';
import { CreateShareDto } from '../dtos/create-share.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { User } from 'src/application/user/entities/user.entity';

@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createShare(@Body() shareDto: CreateShareDto, @GetUser() user: User) {
    return await this.shareService.createShare(shareDto, user);
  }
}
