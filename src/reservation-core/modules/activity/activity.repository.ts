import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Activity } from '../../entities/activity.entity';
import { ActivityNoFoundException } from '../../commons/activity.exception';

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(private dataSource: DataSource) {
    super(Activity, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<Activity> {
    const activity = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!activity) {
      throw new ActivityNoFoundException(id);
    }
    return activity;
  }

  findAll(): Promise<Activity[]> {
    return this.find({
      relations: ['headquarter'],
    });
  }
}
