import { Injectable } from '@nestjs/common';
import { CreateScheduleTableDto } from '../../entities/dto/create-schedule-table.dto';

@Injectable()
export class ScheduleTableService {
  create(createScheduleTableDto: CreateScheduleTableDto) {
    return 'This action adds a new scheduleTable';
  }

  findAll() {
    return `This action returns all scheduleTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleTable`;
  }
}
