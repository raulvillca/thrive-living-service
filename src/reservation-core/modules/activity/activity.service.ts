import { Injectable } from '@nestjs/common';
import {
  CreateActivityDto,
  UpdateActivityDto,
} from '../../entities/dto/activity.dto';
import { ActivityRepository } from './activity.repository';
import { Activity } from '../../entities/activity.entity';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly headquarterRepository: HeadquarterRepository,
  ) {}
  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const { headquarterId, ...activityData } = createActivityDto;
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

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const { headquarterId, ...activityData } = updateActivityDto;
    const headquarter =
      await this.headquarterRepository.findById(headquarterId);
    const activity = await this.activityRepository.findById(id, headquarterId);
    activity.headquarter = headquarter;
    activity.everyWeek = activityData.everyWeek;
    activity.description = activityData.description;
    activity.active = activityData.active;
    activity.name = activityData.name;
    activity.quantity = activityData.quantity;
    return this.activityRepository.save(activity);
  }

  async remove(id: number, headquarterId: number) {
    const activity = await this.activityRepository.findById(id, headquarterId);
    return this.activityRepository.remove(activity);
  }
}
