import { Share } from '../../../application/share/entities/share.entity';
import { User } from '../../../application/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Share)
  share: Share;

  @Column()
  shareId: string;

  @Column({ type: 'decimal' })
  price: string;

  @CreateDateColumn()
  buyDate: Date;
}
