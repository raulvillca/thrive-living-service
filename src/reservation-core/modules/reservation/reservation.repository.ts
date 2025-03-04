import { DataSource, Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';
import { HeadquarterNoFoundException } from '../../commons/headquarter.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class ReservationRepository {
  private repository: Repository<Reservation>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Reservation);
  }

  async findById(id: number, headquarterId: number) {
    const reservation = await this.repository.findOne({
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
    return this.repository
      .createQueryBuilder('reservation')
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

  create(reservation: DeepPartial<Reservation>) {
    return this.repository.create(reservation);
  }

  save(reservation: Reservation) {
    return this.repository.save(reservation);
  }

  remove(reservation: Reservation) {
    return this.repository.remove(reservation);
  }
}
