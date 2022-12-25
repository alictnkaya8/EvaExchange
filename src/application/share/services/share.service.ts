import { Injectable, NotFoundException } from '@nestjs/common';
import { Share } from '../entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShareDto } from '../dtos/create-share.dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {}

  async createShare(shareDto: CreateShareDto) {
    shareDto.price = parseFloat(shareDto.price).toFixed(2);
    const share = this.shareRepository.create(shareDto);
    await this.shareRepository.save(share);
    return share;
  }

  async getById(shareId: string) {
    const share = this.shareRepository.findOne({ where: { id: shareId } });
    if (!share) throw new NotFoundException('share not found');
    return share;
  }
}
