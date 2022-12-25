import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './application/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Share } from './application/share/entities/share.entity';
import { TradeService } from './application/trade/services/trade.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Share) private shareRepository: Repository<Share>,
    private tradeService: TradeService,
  ) {}

  async onModuleInit() {
    const hash = await bcrypt.hash('password', 10);
    const user1 = this.userRepository.create({
      username: 'user1',
      password: hash,
    });
    const user2 = this.userRepository.create({
      username: 'user2',
      password: hash,
    });
    const user3 = this.userRepository.create({
      username: 'user3',
      password: hash,
    });
    const user4 = this.userRepository.create({
      username: 'user4',
      password: hash,
    });
    const user5 = this.userRepository.create({
      username: 'user5',
      password: hash,
    });
    await this.userRepository.save([user1, user2, user3, user4, user5]);

    const share1 = this.shareRepository.create({
      symbol: 'AAA',
      price: '1000',
    });
    const share2 = this.shareRepository.create({
      symbol: 'BBB',
      price: '1000',
    });
    const share3 = this.shareRepository.create({
      symbol: 'CCC',
      price: '1000',
    });
    const share4 = this.shareRepository.create({
      symbol: 'DDD',
      price: '1000',
    });
    const share5 = this.shareRepository.create({
      symbol: 'EEE',
      price: '1000',
    });
    await this.shareRepository.save([share1, share2, share3, share4, share5]);

    await this.tradeService.createBuy(user1, share1.id);
    await this.tradeService.createSell(user1, share1.id);
    await this.tradeService.createBuy(user2, share2.id);
    await this.tradeService.createSell(user2, share2.id);
    await this.tradeService.createBuy(user3, share3.id);
    await this.tradeService.createSell(user3, share3.id);
    await this.tradeService.createBuy(user4, share4.id);
    await this.tradeService.createSell(user4, share4.id);
    await this.tradeService.createBuy(user5, share5.id);
    await this.tradeService.createSell(user5, share5.id);
  }
  getHello(): string {
    return 'Welcome to EvaExchange!';
  }
}
