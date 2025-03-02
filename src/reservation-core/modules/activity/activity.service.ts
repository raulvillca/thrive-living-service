import { Injectable } from '@nestjs/common';
import { ActivityDto } from '../../entities/dto/activity.dto';
import { ActivityRepository } from './activity.repository';
import { Activity } from '../../entities/activity.entity';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly headquarterRepository: HeadquarterRepository,
  ) {}
  async create(activityDto: ActivityDto): Promise<Activity> {
    const { headquarterId, ...activityData } = activityDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);

    const newActivity = this.activityRepository.create({
      ...activityData,
      headquarter,
    });
    return this.activityRepository.save(newActivity);
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  async update(id: number, activityDto: ActivityDto) {
    const { headquarterId, ...activityData } = activityDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const activity = await this.activityRepository.findById(id, headquarterId);
    const updatedActivity = {
      ...activity,
      ...activityData,
      headquarter,
    } as Activity;
    return this.activityRepository.save(updatedActivity);
  }

  async remove(id: number, headquarterId: number) {
    const activity = await this.activityRepository.findById(id, headquarterId);
    return this.activityRepository.remove(activity);
  }
}
