import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DayOfWeek } from '../../entities/day-of-week';
import { DayOfWeekNoFoundException } from '../../commons/day-of-week.exception';

@Injectable()
export class DayOfWeekRepository extends Repository<DayOfWeek> {
  constructor(private dataSource: DataSource) {
    super(DayOfWeek, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<DayOfWeek> {
    const dayOfWeek = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!dayOfWeek) {
      throw new DayOfWeekNoFoundException(id);
    }
    return dayOfWeek;
  }
}
