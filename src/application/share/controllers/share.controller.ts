import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShareService } from '../services/share.service';
import { CreateShareDto } from '../dtos/create-share.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createShare(@Body() shareDto: CreateShareDto) {
    return await this.shareService.createShare(shareDto);
  }
}
