import { Injectable } from '@nestjs/common';
import { TimeGridDto } from '../../entities/dto/time-grid.dto';
import { TimeGridRepository } from './time-grid.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { DayOfWeekRepository } from '../day-of-week/day-of-week.repository';

@Injectable()
export class TimeGridService {
  constructor(
    private readonly timeGridRepository: TimeGridRepository,
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly dayOfWeekRepository: DayOfWeekRepository,
  ) {}
  async create(timeGridDto: TimeGridDto) {
    const { headquarterId, dayOfWeekId, ...timeGridData } = timeGridDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const dayOfWeek = await this.dayOfWeekRepository.findById(
      dayOfWeekId,
      headquarterId,
    );
    const timeGrid = this.timeGridRepository.create({
      ...timeGridData,
      headquarter,
      dayOfWeek,
    });
    return this.timeGridRepository.save(timeGrid);
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  async update(id: number, timeGridDto: TimeGridDto) {
    const { headquarterId, dayOfWeekId, ...timeGridData } = timeGridDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const dayOfWeek = await this.dayOfWeekRepository.findById(
      dayOfWeekId,
      headquarterId,
    );
    const timeGrid = await this.timeGridRepository.findById(id, headquarterId);
    timeGrid.initialTime = new Date(timeGridData.initialTime);
    timeGrid.endTime = new Date(timeGridData.endTime);
    timeGrid.active = timeGridData.active;
    timeGrid.dayOfWeek = dayOfWeek;
    timeGrid.headquarter = headquarter;
    return this.timeGridRepository.save(timeGrid);
  }

  async remove(id: number, headquarterId: number) {
    const timeGrid = await this.timeGridRepository.findById(id, headquarterId);
    await this.timeGridRepository.remove(timeGrid);
  }
}
