import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from './day-of-week.entity';
import { IsBoolean, IsDate } from 'class-validator';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'time_grids' })
export class TimeGrid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  @IsDate()
  initialTime: Date;
  @Column({ type: 'date' })
  @IsDate()
  endTime: Date;
  @Column()
  @IsBoolean()
  active: boolean;
  @OneToOne(() => Headquarter)
  headquarter: Headquarter;
  @ManyToOne(() => DayOfWeek)
  @JoinColumn({ name: 'day_of_week_id' })
  dayOfWeek: DayOfWeek;
}
