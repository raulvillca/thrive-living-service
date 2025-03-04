import { forwardRef, Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MeetingRepository } from './meeting.repository';
import { MeetingCalendarRepository } from './meeting-calendar.repository';
import { TimeGridModule } from '../time-grid/time-grid.module';
import { ActivityModule } from '../activity/activity.module';
import { HeadquarterModule } from '../headquarter/headquarter.module';
import { DayOfWeekModule } from '../day-of-week/day-of-week.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => DayOfWeekModule),
    forwardRef(() => HeadquarterModule),
    forwardRef(() => TimeGridModule),
    forwardRef(() => ActivityModule),
    forwardRef(() => UserModule),
  ],
  controllers: [MeetingController],
  providers: [MeetingService, MeetingRepository, MeetingCalendarRepository],
  exports: [MeetingRepository, MeetingCalendarRepository],
})
export class MeetingModule {}
