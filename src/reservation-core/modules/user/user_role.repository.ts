import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleNoFoundException } from '../../commons/role.exception';
import { UserRole } from '../../entities/user_roles.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class UserRoleRepository {
  private repository: Repository<UserRole>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserRole);
  }

  async findById(id: number, headquarterId: number): Promise<UserRole[]> {
    const role = await this.repository.findBy({ id, headquarter: { id: headquarterId } });
    if (!role) {
      throw new RoleNoFoundException(id);
    }
    return role;
  }

  async findRolesByUserId(id: number, headquarterId: number) {
    const userRoles = await this.repository.find({
      where: {
        user: { id },
        headquarter: { id: headquarterId },
      },
      relations: ['role'],
    });
    if (!userRoles) {
      throw new RoleNoFoundException(id);
    }
    return userRoles.map((ur) => ({ type: ur.role.type, title: ur.role.roleTitle }));
  }

  async findUserIdOrRoleId(userId: number, roleId: number, headquarterId: number) {
    return this.repository
      .createQueryBuilder('userRole')
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

  create(entity: DeepPartial<UserRole>) {
    return this.repository.create(entity);
  }

  save(entity: UserRole) {
    return this.repository.save(entity);
  }
}
