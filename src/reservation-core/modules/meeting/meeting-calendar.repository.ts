import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MeetingCalendarNoFoundException } from '../../commons/meeting.exception';
import { MeetingCalendar } from '../../entities/meeting-calendar.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class MeetingCalendarRepository {
  private repository: Repository<MeetingCalendar>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(MeetingCalendar);
  }

  async findByIdAndHeadquarterId(id: number, headquarterId: number): Promise<MeetingCalendar> {
    const meetingCalendar = await this.repository.findOne({
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

  create(meetingCalendar: DeepPartial<MeetingCalendar>) {
    return this.repository.create(meetingCalendar);
  }

  save(meetingCalendar: MeetingCalendar) {
    return this.repository.save(meetingCalendar);
  }
}
