import { Injectable } from '@nestjs/common';
import { Share } from '../entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShareDto } from '../dtos/create-share.dto';
import { User } from '../../../application/user/entities/user.entity';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {}

  async createShare(shareDto: CreateShareDto, user: User) {
    const share = this.shareRepository.create({ ...shareDto, user });
    await this.shareRepository.save(share);
    return share;
  }
}
