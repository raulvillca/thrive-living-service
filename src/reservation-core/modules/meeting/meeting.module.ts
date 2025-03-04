import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MeetingRepository } from './meeting.repository';
import { DayOfWeekRepository } from '../day-of-week/day-of-week.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { TimeGridRepository } from '../time-grid/time-grid.repository';
import { ActivityRepository } from '../activity/activity.repository';
import { MeetingCalendarRepository } from './meeting-calendar.repository';
import { RoleRepository } from '../user/role.repository';

@Module({
  controllers: [MeetingController],
  providers: [
    MeetingService,
    MeetingRepository,
    DayOfWeekRepository,
    HeadquarterRepository,
    TimeGridRepository,
    ActivityRepository,
    MeetingCalendarRepository,
    RoleRepository,
  ],
})
export class MeetingModule {}
