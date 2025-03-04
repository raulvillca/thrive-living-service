import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MeetingCalendarNoFoundException } from '../../commons/meeting.exception';
import { MeetingCalendar } from '../../entities/meeting-calendar.entity';

@Injectable()
export class MeetingCalendarRepository extends Repository<MeetingCalendar> {
  async findByIdAndHeadquarterId(id: number, headquarterId: number): Promise<MeetingCalendar> {
    const meetingCalendar = await this.findOne({
      where: {
        id,
        headquarter: { id: headquarterId },
      },
      relations: ['headquarter'],
    });
    if (!meetingCalendar) {
      throw new MeetingCalendarNoFoundException(id);
    }
    return meetingCalendar;
  }
}
