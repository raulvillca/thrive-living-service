import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { RoleNoFoundException } from '../../commons/role.exception';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<Role> {
    const role = await this.findOne({
      where: { id, headquarter: { id: headquarterId } },
    });
    if (!role) {
      throw new RoleNoFoundException(id);
    }
    return role;
  }
}
