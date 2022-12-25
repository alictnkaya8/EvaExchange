import { Module } from '@nestjs/common';
import { ShareService } from './services/share.service';
import { ShareController } from './controllers/share.controller';
import { Share } from './entities/share.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Share]), AuthModule, UserModule],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
