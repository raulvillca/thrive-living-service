import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Role | null> {
    return this.findOne({ where: { id } });
  }

  async findByUserId(userId: number): Promise<Role | null> {
    return this.findOne({ where: { user: { id: userId } } });
  }
}
