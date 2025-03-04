import { Injectable } from '@nestjs/common';
import { MeetingDto } from '../../entities/dto/meeting.dto';
import { MeetingRepository } from './meeting.repository';
import { TimeGridRepository } from '../time-grid/time-grid.repository';
import { ActivityRepository } from '../activity/activity.repository';
import { MeetingCalendarRepository } from './meeting-calendar.repository';
import { MeetingCalendarDto } from '../../entities/dto/meeting-calendar.dto';
import { DayOfWeekRepository } from '../day-of-week/day-of-week.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { In } from 'typeorm';
import { Meeting, PlaceTypeConverter } from '../../entities/meeting.entity';
import { RoleRepository } from '../user/role.repository';

@Injectable()
export class MeetingService {
  constructor(
    private readonly dayOfWeekRepository: DayOfWeekRepository,
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly meetingRepository: MeetingRepository,
    private readonly timeGridRepository: TimeGridRepository,
    private readonly activityRepository: ActivityRepository,
    private readonly meetingCalendarRepository: MeetingCalendarRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async createMeetingCalendar(meetingCalendarDto: MeetingCalendarDto) {
    const { dayOfWeekId, meetingIds, headquarterId, ...meetingCalendarData } = meetingCalendarDto;
    const dayOfWeek = await this.dayOfWeekRepository.findById(dayOfWeekId, headquarterId);
    const headquarter = await this.headquarterRepository.findById(headquarterId);
    const meetings = await this.meetingRepository.findBy({
      id: In(meetingIds),
    });
    const meetingCalendar = this.meetingCalendarRepository.create({
      ...meetingCalendarData,
      dayOfWeek,
      headquarter,
      meetings,
    });
    return this.meetingCalendarRepository.save(meetingCalendar);
  }

  async create(meetingDto: MeetingDto, headquarterId: number) {
    const { meetingCalendarId, activityId, timeGridId, placeType, place } = meetingDto;
    const meetingCalendar = await this.meetingCalendarRepository.findByIdAndHeadquarterId(
      meetingCalendarId,
      headquarterId,
    );
    const activity = await this.activityRepository.findById(activityId, headquarterId);
    const timeGrid = await this.timeGridRepository.findById(timeGridId, headquarterId);
    const meeting = this.meetingRepository.create({
      placeType: PlaceTypeConverter.parse(placeType),
      place,
      activity,
      timeGrid,
      meetingCalendar,
    });
    return this.meetingRepository.save(meeting);
  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  async update(id: number, headquarterId: number, meetingDto: MeetingDto) {
    const { meetingCalendarId, activityId, timeGridId, placeType, place, moderatorIds } =
      meetingDto;
    const meeting = await this.meetingRepository.findByIdAndMeetingCalendarId(
      id,
      meetingCalendarId,
    );
    const activity = await this.activityRepository.findById(activityId, headquarterId);
    const timeGrid = await this.timeGridRepository.findById(timeGridId, headquarterId);
    const meetingCalendar = await this.meetingCalendarRepository.findByIdAndHeadquarterId(
      meetingCalendarId,
      headquarterId,
    );
    const moderators = await this.roleRepository.findBy({
      id: In(moderatorIds),
    });
    const updatedMeeting = {
      ...meeting,
      place,
      placeType: PlaceTypeConverter.parse(placeType),
      activity,
      timeGrid,
      meetingCalendar,
      moderators,
    } as Meeting;
    return this.meetingRepository.save(updatedMeeting);
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
