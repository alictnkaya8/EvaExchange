import { Module } from '@nestjs/common';
import { ShareService } from './services/share.service';
import { ShareController } from './controllers/share.controller';
import { Share } from './entities/share.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Share])],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
