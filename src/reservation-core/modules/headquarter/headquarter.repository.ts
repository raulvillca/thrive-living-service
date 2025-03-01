import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Headquarter } from '../../entities/headquarter.entity';
import { HeadquarterNoFoundException } from '../../commons/headquarter.exception';

@Injectable()
export class HeadquarterRepository extends Repository<Headquarter> {
  constructor(private dataSource: DataSource) {
    super(Headquarter, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Headquarter> {
    const headquarter = await this.findOne({
      where: { id },
      relations: ['company', 'supervisor'],
    });
    if (!headquarter) {
      throw new HeadquarterNoFoundException(id);
    }
    return headquarter;
  }
}
