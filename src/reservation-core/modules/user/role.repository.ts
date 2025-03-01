import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { RoleNoFoundException } from '../../commons/role.exception';
import { UserNotFoundException } from '../../commons/user.exception';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Role> {
    const role = await this.findOne({ where: { id } });
    if (!role) {
      throw new RoleNoFoundException(id);
    }
    return role;
  }

  async findByUserId(userId: number): Promise<Role> {
    const role = await this.findOne({ where: { user: { id: userId } } });
    if (!role) {
      throw new UserNotFoundException(userId);
    }
    return role;
  }
}
