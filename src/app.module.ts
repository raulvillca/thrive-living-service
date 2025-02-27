import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation-core/modules/reservation/reservation.module';
import { CompanyModule } from './reservation-core/modules/company/company.module';
import { HeadquarterModule } from './reservation-core/modules/headquarter/headquarter.module';
import { ActivityModule } from './reservation-core/modules/activity/activity.module';
import { ScheduleTableModule } from './reservation-core/modules/schedule-table/schedule-table.module';
import { MeetingModule } from './reservation-core/modules/meeting/meeting.module';
import { ReservationCoreModule } from './reservation-core/reservation-core.module';
import { InfrastructureModule } from './reservation-core/infrastructure/infrastructure.module';

@Module({
  imports: [
    ReservationModule,
    CompanyModule,
    HeadquarterModule,
    ActivityModule,
    ScheduleTableModule,
    MeetingModule,
    ReservationCoreModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
