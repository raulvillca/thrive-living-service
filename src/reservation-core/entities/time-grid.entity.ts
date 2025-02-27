import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from './day-of-week';
import { IsBoolean } from 'class-validator';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'time_grids' })
export class TimeGrid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  initialTime: Date;
  @Column({ type: 'date' })
  endTime: Date;
  @Column()
  @IsBoolean()
  active: boolean;
  @OneToOne(() => Headquarter)
  headquarter: Headquarter;
  @ManyToOne(() => DayOfWeek)
  dayOfWeek: DayOfWeek;
}
