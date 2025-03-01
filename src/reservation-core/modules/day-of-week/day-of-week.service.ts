import { Injectable } from '@nestjs/common';
import { DayOfWeekDto } from '../../entities/dto/day-of-week.dto';
import { DayOfWeekRepository } from './day-of-week.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { DayOfWeek } from '../../entities/day-of-week';

@Injectable()
export class DayOfWeekService {
  constructor(
    private readonly dayOfWeekRepository: DayOfWeekRepository,
    private readonly headquarterRepository: HeadquarterRepository,
  ) {}
  async create(dayOfWeekDto: DayOfWeekDto) {
    const { headquarterId, ...dayOfWeekData } = dayOfWeekDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const dayOfWeek = this.dayOfWeekRepository.create({
      ...dayOfWeekData,
      headquarter,
    });
    await this.dayOfWeekRepository.save(dayOfWeek);
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  async update(id: number, dayOfWeekDto: DayOfWeekDto) {
    const { headquarterId, ...dayOfWeekData } = dayOfWeekDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const dayOfWeek = await this.dayOfWeekRepository.findById(
      id,
      headquarterId,
    );
    const updatedDayOfWeek = {
      ...dayOfWeek,
      ...dayOfWeekData,
      headquarter,
    } as DayOfWeek;
    await this.dayOfWeekRepository.save(updatedDayOfWeek);
  }

  async remove(id: number, headquarterId: number) {
    const dayOfWeek = await this.dayOfWeekRepository.findById(
      id,
      headquarterId,
    );
    return await this.dayOfWeekRepository.remove(dayOfWeek);
  }
}
