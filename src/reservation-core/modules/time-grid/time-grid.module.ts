import { Module } from '@nestjs/common';
import { TimeGridService } from './time-grid.service';
import { TimeGridController } from './time-grid.controller';
import { TimeGridRepository } from './time-grid.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { DayOfWeekRepository } from '../day-of-week/day-of-week.repository';

@Module({
  controllers: [TimeGridController],
  providers: [TimeGridService, TimeGridRepository, HeadquarterRepository, DayOfWeekRepository],
})
export class TimeGridModule {}
