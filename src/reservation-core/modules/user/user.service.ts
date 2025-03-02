import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { UserDto } from '../../entities/dto/user.dto';
import { HeadquarterRepository } from '../headquarter/headquarter.repository';
import { User } from '../../entities/user.entity';
import { UserRoleRepository } from './user_role.repository';
import { UserRoleReallyExistException } from '../../commons/role.exception';
import { UserRole } from '../../entities/user_roles.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async create(userDto: UserDto) {
    const { roleId, headquarterId, ...userData } = userDto;
    const headquarter = await this.headquarterRepository.findById(headquarterId);
    const user = this.userRepository.create({
      ...userData,
      headquarter,
    });
    const userCreated = await this.userRepository.save(user);

    if (roleId) {
      const role = await this.roleRepository.findById(roleId, headquarterId);
      const userRole = this.userRoleRepository.create({
        user: { id: userCreated.id },
        role: { id: role.id },
        headquarter: { id: userDto.headquarterId },
        active: true,
      });
      await this.userRoleRepository.save(userRole);
    }
    return userCreated;
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  async changeRole(id: number, updateUserDto: UserDto) {
    const { roleId, headquarterId, ...userData } = updateUserDto;
    const user = await this.userRepository.findById(id, headquarterId);
    const role = await this.roleRepository.findById(roleId!, headquarterId);

    return this.userRepository.save(user);
  }

  async assignRoleToUser(id: number, userDto: UserDto) {
    const userRoleExist = await this.userRoleRepository.findUserIdOrRoleId(
      id,
      userDto.roleId!,
      userDto.headquarterId,
    );
    if (userRoleExist?.user?.id == id && userRoleExist?.role?.id == userDto.roleId) {
      throw new UserRoleReallyExistException(id, userDto.roleId);
    }
    const userRole = this.userRoleRepository.create({
      user: { id },
      role: { id: userDto.roleId! },
      headquarter: { id: userDto.headquarterId },
      active: true,
    });
    return this.userRoleRepository.save(userRole);
  }

  async update(id: number, userDto: UserDto) {
    const { roleId, headquarterId, birthdate, ...userData } = userDto;
    const headquarter = await this.headquarterRepository.findById(headquarterId);
    const role = await this.roleRepository.findById(roleId!, headquarterId);
    const user = await this.userRepository.findById(id, headquarterId);
    const updateUser = {
      ...user,
      ...userData,
      birthdate: new Date(birthdate),
      role,
      headquarter,
    } as User;
    return this.userRepository.save(updateUser);
  }

  async remove(id: number, headquarterId: number) {
    const user = await this.userRepository.findById(id, headquarterId);
    user.active = false;
    await this.userRepository.save(user);
  }

  async removeAssignedRole(userId: number, roleId: number, headquarterId: number) {
    const userRole = await this.userRoleRepository.findUserIdOrRoleId(
      userId,
      roleId,
      headquarterId,
    );
    const updatedUserRole = {
      ...userRole,
      active: false,
    } as UserRole;
    await this.userRepository.save(updatedUserRole);
  }
}
