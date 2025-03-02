import { Injectable } from '@nestjs/common';
import { HeadquarterRepository } from './headquarter.repository';
import { CompanyRepository } from '../company/company.repository';
import { Headquarter } from '../../entities/headquarter.entity';
import { RoleRepository } from '../user/role.repository';
import { HeadquarterDto } from '../../entities/dto/headquarter.dto';

@Injectable()
export class HeadquarterService {
  constructor(
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(headquarterDto: HeadquarterDto) {
    const { companyId, supervisorId, ...headquarterData } = headquarterDto;
    const company = await this.companyRepository.findById(companyId);
    const supervisor = await this.roleRepository.findById(supervisorId);

    const headquarter = this.headquarterRepository.create({
      supervisor,
      company,
      active: true,
      location: headquarterData.location,
    });
    return this.headquarterRepository.save(headquarter);
  }

  async update(id: number, headquarterDto: HeadquarterDto) {
    const { companyId, supervisorId, ...headquarterData } = headquarterDto;
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

  async remove(id: number) {
    const headquarter = await this.headquarterRepository.findById(id);
    await this.headquarterRepository.remove(headquarter);
  }
}
