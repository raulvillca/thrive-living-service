import { forwardRef, Module } from '@nestjs/common';
import { DayOfWeekService } from './day-of-week.service';
import { DayOfWeekController } from './day-of-week.controller';
import { DayOfWeekRepository } from './day-of-week.repository';
import { HeadquarterModule } from '../headquarter/headquarter.module';

@Module({
  imports: [forwardRef(() => HeadquarterModule)],
  controllers: [DayOfWeekController],
  providers: [DayOfWeekService, DayOfWeekRepository],
  exports: [DayOfWeekRepository],
})
export class DayOfWeekModule {}
