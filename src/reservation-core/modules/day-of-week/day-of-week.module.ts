import { Module } from '@nestjs/common';
import { DayOfWeekService } from './day-of-week.service';
import { DayOfWeekController } from './day-of-week.controller';
import { DayOfWeekRepository } from './day-of-week.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';

@Module({
  controllers: [DayOfWeekController],
  providers: [DayOfWeekService, DayOfWeekRepository, HeadquarterRepository],
})
export class DayOfWeekModule {}
