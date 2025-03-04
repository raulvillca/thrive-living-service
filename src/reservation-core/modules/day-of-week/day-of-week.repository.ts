import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { DayOfWeek } from '../../entities/day-of-week.entity';
import { DayOfWeekNoFoundException } from '../../commons/day-of-week.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class DayOfWeekRepository {
  private repository: Repository<DayOfWeek>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DayOfWeek);
  }

  async findById(id: number, headquarterId: number): Promise<DayOfWeek> {
    const dayOfWeek = await this.repository.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!dayOfWeek) {
      throw new DayOfWeekNoFoundException(id);
    }
    return dayOfWeek;
  }

  create(dayOfWeek: DeepPartial<DayOfWeek>) {
    return this.repository.create(dayOfWeek);
  }

  save(dayOfWeek: DayOfWeek) {
    return this.repository.save(dayOfWeek);
  }

  remove(dayOfWeek: DayOfWeek) {
    return this.repository.remove(dayOfWeek);
  }
}
