import { Module } from '@nestjs/common';
import { TimeGridService } from './time-grid.service';
import { TimeGridController } from './time-grid.controller';

@Module({
  controllers: [TimeGridController],
  providers: [TimeGridService],
})
export class TimeGridModule {}
