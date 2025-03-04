import { forwardRef, Global, Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { HeadquarterModule } from '../headquarter/headquarter.module';

@Global()
@Module({
  imports: [forwardRef(() => HeadquarterModule)],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
