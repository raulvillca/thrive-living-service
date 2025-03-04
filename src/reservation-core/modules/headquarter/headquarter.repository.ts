import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Headquarter } from '../../entities/headquarter.entity';
import { HeadquarterNoFoundException } from '../../commons/headquarter.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class HeadquarterRepository {
  private repository: Repository<Headquarter>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Headquarter);
  }

  async findAll() {
    return this.repository.find({
      where: { active: true },
      relations: ['company', 'supervisor'],
    });
  }

  async findById(id: number): Promise<Headquarter> {
    const headquarter = await this.repository.findOne({
      where: { id },
      relations: ['company', 'supervisor'],
    });
    if (!headquarter) {
      throw new HeadquarterNoFoundException(id);
    }
    return headquarter;
  }

  create(entity: DeepPartial<Headquarter>) {
    return this.repository.create(entity);
  }

  save(entity: Headquarter) {
    return this.repository.save(entity);
  }

  remove(headquarter: Headquarter) {
    return this.repository.remove(headquarter);
  }
}
