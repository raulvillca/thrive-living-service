import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleNoFoundException } from '../../commons/role.exception';
import { UserRole } from '../../entities/user_roles.entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {
  constructor(private dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async findById(id: number, headquarterId: number): Promise<UserRole[]> {
    const role = await this.findBy({ id, headquarter: { id: headquarterId } });
    if (!role) {
      throw new RoleNoFoundException(id);
    }
    return role;
  }

  async findUserIdOrRoleId(userId: number, roleId: number, headquarterId: number) {
    return this.createQueryBuilder('userRole')
      .leftJoinAndSelect('userRole.user', 'user')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('userRole.headquarter', 'headquarter')
      .where('user.id = :userId', { userId })
      .andWhere('role.id = :roleId', { roleId })
      .andWhere('headquarter.id = :headquarterId', { headquarterId })
      .orWhere('role.id IS NULL')
      .distinct(true)
      .getOne();
  }
}
