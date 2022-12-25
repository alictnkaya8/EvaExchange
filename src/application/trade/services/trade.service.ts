import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from '../entities/trade.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from 'src/application/user/entities/user.entity';
import { ShareService } from 'src/application/share/services/share.service';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade) private tradeRepository: Repository<Trade>,
    private readonly shareService: ShareService,
    private readonly dataSource: DataSource,
  ) {}

  async createBuy(user: User, shareId: string) {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const share = await this.shareService.getById(shareId);
      if (+user.cash < +share.price) throw new Error('not enough cash for buy');
      const buy = this.tradeRepository.create({
        user,
        share,
        price: share.price,
        type: 'buy',
      });
      user.cash = (+user.cash - +share.price).toString();
      user.stock = (+user.stock + 1).toString();
      await entityManager.save([buy, user]);
      return buy;
    });
  }

  async createSell(user: User, shareId: string) {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const share = await this.shareService.getById(shareId);
      // user için ilgili hissenin stok kontrolü yapılabilirdi ancak vaktim az olduğu için yapamadım.
      if (+user.stock == 0) throw new Error('You have not stock for sell');
      const sell = this.tradeRepository.create({
        user,
        share,
        price: share.price,
        type: 'sell',
      });
      user.cash = (+user.cash + +share.price).toString();
      user.stock = (+user.stock - 1).toString();
      await entityManager.save([sell, user]);
      return sell;
    });
  }
}
