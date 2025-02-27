import { Module } from '@nestjs/common';
import { ScheduleTableService } from './schedule-table.service';
import { ScheduleTableController } from './schedule-table.controller';

@Module({
  controllers: [ScheduleTableController],
  providers: [ScheduleTableService],
})
export class ScheduleTableModule {}
