import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingDto } from '../../entities/dto/meeting.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post(':headquarter_id')
  create(
    @Param('headquarter_id') headquarterId: number,
    @Body() meetingDto: MeetingDto,
  ) {
    return this.meetingService.create(meetingDto, headquarterId);
  }

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meetingService.findOne(+id);
  }

  @Patch(':id/reservation/:headquarter_id')
  update(
    @Param('id') id: number,
    @Param('headquarter_id') headquarterId: number,
    @Body() meetingDto: MeetingDto,
  ) {
    return this.meetingService.update(+id, headquarterId, meetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.meetingService.remove(+id);
  }
}
