import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Headquarter } from './headquarter.entity';

@Entity({ schema: 'reservation_schema', name: 'day_of_weeks' })
export class DayOfWeek {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  dayName: string;
  @Column({ type: 'int' })
  @IsNumber()
  dayNumber: string;
  @Column()
  @IsBoolean()
  active: boolean;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
}
