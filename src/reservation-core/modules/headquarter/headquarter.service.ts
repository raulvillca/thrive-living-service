import { Injectable } from '@nestjs/common';
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
    const supervisor = await this.roleRepository.findById(
      createHeadquarterDto.supervisorId,
    );

    const headquarter = new Headquarter();
    headquarter.active = true;
    headquarter.location = createHeadquarterDto.location;
    headquarter.company = company;
    headquarter.supervisor = supervisor;
    return this.headquarterRepository.save(headquarter);
  }

  async update(id: number, updateHeadquarterDto: UpdateHeadquarterDto) {
    const { companyId, supervisorId, ...headquarterData } =
      updateHeadquarterDto;
    const company = await this.companyRepository.findById(companyId);
    const supervisor = await this.roleRepository.findById(supervisorId);
    const headquarter = await this.headquarterRepository.findById(id);

    const updatedHeadquarter = {
      ...headquarter,
      ...headquarterData,
      company,
      supervisor,
    } as Headquarter;
    return this.headquarterRepository.save(updatedHeadquarter);
  }

  remove(id: number) {
    return `This action removes a #${id} headquarter`;
  }
}
