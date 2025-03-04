import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Activity } from './activity.entity';
import { TimeGrid } from './time-grid.entity';
import { MeetingCalendar } from './meeting-calendar.entity';
import { IsString } from 'class-validator';
import { Role } from './role.entity';

export enum PlaceType {
  REMOTE = 'remote',
  ON_SITE = 'on-site',
}

export class PlaceTypeConverter {
  static parse(value: string): PlaceType {
    if (!Object.values(PlaceType).includes(value as PlaceType)) {
      throw new Error(`Invalid PlaceType: ${value}`);
    }
    return value as PlaceType;
  }
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
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  moderators: Role[];
}
