import { forwardRef, Module } from '@nestjs/common';
import { ActivityModule } from './modules/activity/activity.module';
import { CompanyModule } from './modules/company/company.module';
import { HeadquarterModule } from './modules/headquarter/headquarter.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { TimeGridModule } from './modules/time-grid/time-grid.module';
import { DayOfWeekModule } from './modules/day-of-week/day-of-week.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  exports: [ActivityModule, CompanyModule, HeadquarterModule, MeetingModule, ReservationModule],
  imports: [
    ActivityModule,
    CompanyModule,
    HeadquarterModule,
    MeetingModule,
    ReservationModule,
    forwardRef(() => TimeGridModule),
    DayOfWeekModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class ReservationCoreModule {}
