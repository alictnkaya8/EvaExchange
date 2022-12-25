import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './application/user/user.module';
import { ShareModule } from './application/share/share.module';
import { AuthModule } from './application/auth/auth.module';
import { TradeModule } from './application/trade/trade.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './application/user/entities/user.entity';
import { Share } from './application/share/entities/share.entity';
import { Trade } from './application/trade/entities/trade.entity';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ShareModule,
    AuthModule,
    TradeModule,
    TypeOrmModule.forFeature([User, Share]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
