import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Meeting } from '../../entities/meeting.entity';
import { MeetingNoFoundException } from '../../commons/meeting.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class MeetingRepository {
  private repository: Repository<Meeting>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Meeting);
  }

  async findByIdAndMeetingCalendarId(id: number, meetingCalendarId: number): Promise<Meeting> {
    const meeting = await this.repository.findOne({
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

  findBy(where: FindOptionsWhere<Meeting>) {
    return this.repository.findBy(where);
  }

  create(meeting: DeepPartial<Meeting>) {
    return this.repository.create(meeting);
  }

  save(meeting: Meeting) {
    return this.repository.save(meeting);
  }
}
