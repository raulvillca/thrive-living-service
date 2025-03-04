import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeGrid } from '../../entities/time-grid.entity';
import { TimeGridNoFoundException } from '../../commons/time-grid.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class TimeGridRepository {
  private repository: Repository<TimeGrid>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(TimeGrid);
  }

  async findById(id: number, headquarterId: number): Promise<TimeGrid> {
    const timeGrid = await this.repository.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!timeGrid) {
      throw new TimeGridNoFoundException(id);
    }
    return timeGrid;
  }

  create(timeGrid: DeepPartial<TimeGrid>) {
    return this.repository.create(timeGrid);
  }

  save(timeGrid: TimeGrid) {
    return this.repository.save(timeGrid);
  }

  remove(timeGrid: TimeGrid) {
    return this.repository.remove(timeGrid);
  }
}
