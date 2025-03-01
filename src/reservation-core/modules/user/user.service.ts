import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { RoleNoFoundException } from '../../commons/role.exception';
import { UserDto } from '../../entities/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  create(createUserDto: UserDto) {
    //TODO cambiar y hay que agregar datos personales.
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  async changeRole(id: number, updateUserDto: UserDto) {
    const {roleId, ...userData} = updateUserDto;
    const user = await this.userRepository.findById(id);
    const role = await this.roleRepository.findByUserId(roleId!);
    if (!role) {
      throw new RoleNoFoundException(roleId!);
    }

    user.role = role;

    return this.userRepository.save(user);
  }

  async update(id: number, userDto: UserDto) {
    const {roleId, ...userData} = userDto;
    const role = await this.roleRepository.findByUserId(roleId);

  }

  async remove(id: number, headquarterId: number) {
    const user = await this.userRepository.findById(id, headquarterId);
    user.active = false;
    await this.userRepository.save(user);
  }
}
