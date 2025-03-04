import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { MeetingRepository } from '../meeting/meeting.repository';
import { RoleRepository } from '../user/role.repository';
import { CommentService } from './comment.service';
import { CompanyRepository } from '../company/company.repository';
import { CommentRepository } from './comment.repository';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
    HeadquarterRepository,
    MeetingRepository,
    RoleRepository,
    CompanyRepository,
    CommentService,
    CommentRepository,
  ],
})
export class ReservationModule {}
