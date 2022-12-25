import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TradeService } from '../services/trade.service';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { User } from 'src/application/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('buy')
  buyShare(@GetUser() user: User, @Body('shareId') shareId: string) {
    return this.tradeService.createBuy(user, shareId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('sell')
  sellShare(@GetUser() user: User, @Body('shareId') shareId: string) {
    return this.tradeService.createSell(user, shareId);
  }
}
