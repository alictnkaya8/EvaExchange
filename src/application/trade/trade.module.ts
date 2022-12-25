import { Module } from '@nestjs/common';
import { TradeService } from './services/trade.service';
import { TradeController } from './controllers/trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { ShareModule } from '../share/share.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trade]), ShareModule, AuthModule],
  providers: [TradeService],
  controllers: [TradeController],
  exports: [TradeService],
})
export class TradeModule {}
