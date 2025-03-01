import { DataSource, Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { Injectable } from '@nestjs/common';
import { HeadquarterNoFoundException } from '../../commons/headquarter.exception';

@Injectable()
export class ReservationRepository extends Repository<Reservation> {
  constructor(private dataSource: DataSource) {
    super(Reservation, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number) {
    const reservation = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
      relations: ['headquarter', 'meeting', 'comments'],
    });
    if (!reservation) {
      throw new HeadquarterNoFoundException(id);
    }
    return reservation;
  }

  async findReservations(
    startDate: Date,
    endDate: Date,
    attended: boolean,
    institutionId: number,
  ): Promise<Reservation[]> {
    return this.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.headquarter', 'headquarter')
      .leftJoinAndSelect('reservation.meeting', 'meeting')
      .leftJoinAndSelect('reservation.comments', 'comments')
      .where('reservation.fromDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('reservation.attended = :attended', { attended })
      .andWhere('headquarter.institutionId = :institutionId', { institutionId })
      .orderBy('reservation.fromDate', 'ASC')
      .getMany();
  }
}
