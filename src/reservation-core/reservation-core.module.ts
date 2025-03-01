import { Module } from '@nestjs/common';
import { ActivityModule } from './modules/activity/activity.module';
import { CompanyModule } from './modules/company/company.module';
import { HeadquarterModule } from './modules/headquarter/headquarter.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ScheduleTableModule } from './modules/schedule-table/schedule-table.module';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './infrastructure/image.service';

@Module({
  exports: [
    ActivityModule,
    CompanyModule,
    HeadquarterModule,
    MeetingModule,
    ReservationModule,
    ScheduleTableModule,
  ],
  imports: [ConfigModule.forRoot()],
  providers: [ImageService],
})
export class ReservationCoreModule {}
