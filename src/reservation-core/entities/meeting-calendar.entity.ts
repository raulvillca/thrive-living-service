import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meeting } from './meeting.entity';
import { Headquarter } from './headquarter.entity';
import { DayOfWeek } from './day-of-week';

@Entity({ schema: 'reservation_schema', name: 'meeting_calendars' })
export class MeetingCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DayOfWeek)
  dayOfWeek: DayOfWeek;
  @ManyToOne(() => Headquarter)
  headquarter: Headquarter;
  @OneToMany(() => Meeting, (meeting) => meeting.meetingCalendar)
  meetings: Meeting[];
}
