import { Injectable } from '@nestjs/common';
import {
  CreateMeetingDto,
  UpdateMeetingDto,
} from '../../entities/dto/meeting.dto';

@Injectable()
export class MeetingService {
  create(createMeetingDto: CreateMeetingDto) {
    return 'This action adds a new meeting';
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
