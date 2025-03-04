import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Activity } from '../../entities/activity.entity';
import { ActivityNoFoundException } from '../../commons/activity.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class ActivityRepository {
  private repository: Repository<Activity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Activity);
  }

  async findById(id: number, headquarterId: number): Promise<Activity> {
    const activity = await this.repository.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter'],
    });
    if (!activity) {
      throw new ActivityNoFoundException(id);
    }
    return activity;
  }

  findAll(): Promise<Activity[]> {
    return this.repository.find({
      relations: ['headquarter'],
    });
  }

  create(activity: DeepPartial<Activity>) {
    return this.repository.create(activity);
  }

  save(activity: Activity) {
    return this.repository.save(activity);
  }

  remove(activity: Activity) {
    return this.repository.remove(activity);
  }
}
