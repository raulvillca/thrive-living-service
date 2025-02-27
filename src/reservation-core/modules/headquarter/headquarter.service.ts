import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateHeadquarterDto,
  UpdateHeadquarterDto,
} from '../../entities/dto/headquarter.dto';
import { HeadquarterRepository } from './headquarter.repository';
import { CompanyRepository } from '../company/company.repository';
import { UserRepository } from '../user/user.repository';
import { Headquarter } from '../../entities/headquarter.entity';
import { RoleRepository } from '../user/role.repository';

@Injectable()
export class HeadquarterService {
  constructor(
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(createHeadquarterDto: CreateHeadquarterDto) {
    const company = await this.companyRepository.findById(
      createHeadquarterDto.companyId,
    );
    if (!company) {
      throw new NotFoundException(
        `Company with id ${createHeadquarterDto.companyId} not found`,
      );
    }

    const supervisor = await this.roleRepository.findById(
      createHeadquarterDto.supervisorId,
    );
    if (!supervisor) {
      throw new NotFoundException(
        `Supervisor with id ${createHeadquarterDto.supervisorId} not found`,
      );
    }

    const headquarter = new Headquarter();
    headquarter.active = true;
    headquarter.location = createHeadquarterDto.location;
    headquarter.company = company;
    headquarter.supervisor = supervisor;
    return this.headquarterRepository.save(headquarter);
  }

  update(id: number, updateHeadquarterDto: UpdateHeadquarterDto) {

    return `This action updates a #${id} headquarter`;
  }

  remove(id: number) {
    return `This action removes a #${id} headquarter`;
  }
}
