import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from './meeting.entity';
import { Headquarter } from './headquarter.entity';
import { DayOfWeek } from './day-of-week';
import { IsNumber, IsString } from 'class-validator';

@Entity({ schema: 'reservation_schema', name: 'meeting_calendars' })
export class MeetingCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;
  @Column()
  @IsNumber()
  meetingCalendarNumber: number;
  @ManyToOne(() => DayOfWeek)
  dayOfWeek: DayOfWeek;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
  @OneToMany(() => Meeting, (meeting) => meeting.meetingCalendar)
  meetings: Meeting[];
}
