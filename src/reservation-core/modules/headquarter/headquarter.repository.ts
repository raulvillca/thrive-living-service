import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Headquarter } from '../../entities/headquarter.entity';

@Injectable()
export class HeadquarterRepository extends Repository<Headquarter> {
  constructor(private dataSource: DataSource) {
    super(Headquarter, dataSource.createEntityManager());
  }
}
