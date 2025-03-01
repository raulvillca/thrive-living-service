import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Meeting } from '../../entities/meeting.entity';
import { MeetingNoFoundException } from '../../commons/meeting.exception';

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
  constructor(private dataSource: DataSource) {
    super(Meeting, dataSource.createEntityManager());
  }

  async findByIdAndMeetingCalendarId(
    id: number,
    meetingCalendarId: number,
  ): Promise<Meeting> {
    const meeting = await this.findOne({
      where: {
        id,
        meetingCalendar: { id: meetingCalendarId },
      },
      relations: ['meetingCalendar'],
    });
    if (!meeting) {
      throw new MeetingNoFoundException(id);
    }
    return meeting;
  }
}
