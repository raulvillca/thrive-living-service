import { Injectable } from '@nestjs/common';
import { ReservationDto } from '../../entities/dto/reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { MeetingRepository } from '../meeting/meeting.repository';
import { RoleRepository } from '../user/role.repository';
import { Reservation } from '../../entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly meetingRepository: MeetingRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(reservationDto: ReservationDto) {
    const { headquarterId, clientId, meetingCalendarId, meetingId, ...reservationData } =
      reservationDto;
    const headquarter = await this.headquarterRepository.findById(headquarterId);
    const meeting = await this.meetingRepository.findByIdAndMeetingCalendarId(
      meetingId,
      meetingCalendarId,
    );
    const client = await this.roleRepository.findById(clientId, headquarterId);
    const reservation = this.reservationRepository.create({
      ...reservationData,
      headquarter,
      meeting,
      client,
    });
    return this.reservationRepository.save(reservation);
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async update(id: number, reservationDto: ReservationDto) {
    const { headquarterId, clientId, meetingCalendarId, meetingId, ...reservationData } =
      reservationDto;
    const headquarter = await this.headquarterRepository.findById(headquarterId);
    const meeting = await this.meetingRepository.findByIdAndMeetingCalendarId(
      meetingId,
      meetingCalendarId,
    );
    const client = await this.roleRepository.findById(clientId, headquarterId);
    const reservation = await this.reservationRepository.findById(id, headquarterId);
    const updatedReservation = {
      ...reservation,
      ...reservationData,
      headquarter,
      meeting,
      client,
    } as Reservation;
    return this.reservationRepository.save(updatedReservation);
  }

  async remove(id: number, headquarterId: number) {
    const reservation = await this.reservationRepository.findById(id, headquarterId);
    await this.reservationRepository.remove(reservation);
  }
}
