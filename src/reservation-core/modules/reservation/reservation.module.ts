import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../../entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController, ReservationRepository],
  providers: [ReservationService],
})
export class ReservationModule {}
