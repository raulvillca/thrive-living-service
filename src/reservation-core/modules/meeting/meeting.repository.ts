import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Meeting } from '../../entities/meeting.entity';

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
  constructor(private dataSource: DataSource) {
    super(Meeting, dataSource.createEntityManager());
  }
}
