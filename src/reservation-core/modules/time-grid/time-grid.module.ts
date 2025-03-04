import { Module } from '@nestjs/common';
import { TimeGridService } from './time-grid.service';
import { TimeGridController } from './time-grid.controller';
import { TimeGridRepository } from './time-grid.repository';
import { HeadquarterModule } from '../headquarter/headquarter.module';
import { DayOfWeekModule } from '../day-of-week/day-of-week.module';

@Module({
  imports: [HeadquarterModule, DayOfWeekModule],
  controllers: [TimeGridController],
  providers: [TimeGridService, TimeGridRepository],
  exports: [TimeGridRepository],
})
export class TimeGridModule {}
