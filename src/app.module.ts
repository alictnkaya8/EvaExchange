import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './application/user/user.module';
import { ShareModule } from './application/share/share.module';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, ShareModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
