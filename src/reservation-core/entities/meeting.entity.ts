import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from './activity.entity';
import { TimeGrid } from './time-grid.entity';
import { MeetingCalendar } from './meeting-calendar.entity';
import { IsString } from 'class-validator';

export enum PlaceType {
  REMOTE = 'remote',
  ON_SITE = 'on-site',
}

@Entity({ schema: 'reservation_schema', name: 'meetings' })
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PlaceType,
    default: PlaceType.ON_SITE,
  })
  placeType: PlaceType;
  @Column()
  @IsString()
  place: string;
  @ManyToOne(() => Activity)
  activity: Activity;
  @ManyToOne(() => TimeGrid)
  timeGrid: TimeGrid;
  @ManyToOne(() => MeetingCalendar)
  meetingCalendar: MeetingCalendar;
}
