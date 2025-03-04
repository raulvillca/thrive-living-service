import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Headquarter } from './headquarter.entity';
import { Meeting } from './meeting.entity';
import { IsBoolean, IsDate } from 'class-validator';
import { Comment } from './comment.entity';
import { Role } from './role.entity';

@Entity({ schema: 'reservation_schema', name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Role)
  client: Role;
  @Column({ default: false })
  @IsBoolean()
  attended: boolean;
  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;
  @OneToOne(() => Headquarter)
  headquarter: Headquarter;
  @ManyToOne(() => Meeting)
  meeting: Meeting;
  @OneToMany(() => Comment, (comment) => comment.reservation)
  comments: Comment[];
}
