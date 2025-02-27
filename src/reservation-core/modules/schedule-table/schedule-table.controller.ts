import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ScheduleTableService } from './schedule-table.service';
import { CreateScheduleTableDto } from '../../entities/dto/create-schedule-table.dto';

@Controller('schedule-table')
export class ScheduleTableController {
  constructor(private readonly scheduleTableService: ScheduleTableService) {}

  @Post()
  create(@Body() createScheduleTableDto: CreateScheduleTableDto) {
    return this.scheduleTableService.create(createScheduleTableDto);
  }

  @Get()
  findAll() {
    return this.scheduleTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleTableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleTableService.remove(+id);
  }
}
