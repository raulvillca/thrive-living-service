import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Entity({ schema: 'reservation_schema', name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @IsString()
  @IsOptional()
  content: string;
  @Column({ type: 'float', nullable: true })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rate?: number;
  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  localDateTime: Date;
  @ManyToOne(() => Reservation, (reservation) => reservation.comments)
  reservation: Reservation;
}
