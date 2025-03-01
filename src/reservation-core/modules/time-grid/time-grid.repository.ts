import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeGrid } from '../../entities/time-grid.entity';
import { TimeGridNoFoundException } from '../../commons/time-grid.exception';

@Injectable()
export class TimeGridRepository extends Repository<TimeGrid> {
  constructor(private dataSource: DataSource) {
    super(TimeGrid, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<TimeGrid> {
    const timeGrid = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!timeGrid) {
      throw new TimeGridNoFoundException(id);
    }
    return timeGrid;
  }
}
