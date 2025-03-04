import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { RoleNoFoundException } from '../../commons/role.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class RoleRepository {
  private repository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    if (!this.dataSource) {
      throw new Error('DATA_SOURCE is not initialized');
    }
    this.repository = this.dataSource.getRepository(Role);
  }

  async findById(id: number, headquarterId: number): Promise<Role> {
    const role = await this.repository.findOne({
      where: { id, headquarter: { id: headquarterId } },
    });
    if (!role) {
      throw new RoleNoFoundException(id);
    }
    return role;
  }

  findBy(where: FindOptionsWhere<Role>) {
    return this.repository.findBy(where);
  }

  create(role: DeepPartial<Role>) {
    return this.repository.create(role);
  }

  save(role: Role) {
    return this.repository.save(role);
  }
}
