import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDto } from '../../entities/dto/activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() activityDto: ActivityDto) {
    return this.activityService.create(activityDto);
  }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() activityDto: ActivityDto) {
    return this.activityService.update(+id, activityDto);
  }

  @Delete(':id/headquarter/:headquarter_id')
  async remove(@Param('id') id: number, @Param('headquarter_id') headquarterId: number) {
    await this.activityService.remove(+id, headquarterId);
  }
}
