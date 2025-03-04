import { Global, Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';

@Global()
@Module({
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository, HeadquarterRepository],
  exports: [ActivityService],
})
export class ActivityModule {}
