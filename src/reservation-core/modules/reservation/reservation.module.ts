import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { HeadquarterModule } from '../headquarter/headquarter.module';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { MeetingModule } from '../meeting/meeting.module';

@Module({
  imports: [HeadquarterModule, CompanyModule, MeetingModule, UserModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, CommentService, CommentRepository],
})
export class ReservationModule {}
