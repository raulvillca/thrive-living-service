import { Injectable } from '@nestjs/common';
import { HeadquarterRepository } from './headquarter.repository';
import { Headquarter } from '../../entities/headquarter.entity';
import { HeadquarterDto } from '../../entities/dto/headquarter.dto';
import { CompanyService } from '../company/company.service';
import { UserService } from '../user/user.service';
import { CompanyDemoDto } from '../../entities/dto/company-headquarter.dto';

@Injectable()
export class HeadquarterService {
  constructor(
    private readonly headquarterRepository: HeadquarterRepository,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  async create(headquarterDto: HeadquarterDto) {
    const { companyId, ...headquarterData } = headquarterDto;
    //const company = await this.companyRepository.findById(companyId);
    const company = await this.companyService.findOne(companyId);
    //const supervisor = await this.roleRepository.findById(supervisorId);

    const headquarter = this.headquarterRepository.create({
      //supervisor,
      company,
      active: true,
      location: headquarterData.location,
    });
    return this.headquarterRepository.save(headquarter);
  }

  async createDemo(companyDemo: CompanyDemoDto) {
    const company = await this.companyService.create(companyDemo.company);
    const headquarter = await this.create({
      location: companyDemo.location,
      active: true,
      companyId: company.id,
    });
    const user = await this.userService.create({
      ...companyDemo.user,
      headquarterId: headquarter.id,
    });
    const role = await this.userService.createRol({
      type: 'supervisor',
      headquarterId: headquarter.id,
      roleTitle: 'Supervisor',
    });
    return this.userService.createAssignedRolTo({
      userId: user.id,
      roleId: role.id,
      headquarterId: headquarter.id,
    });
  }

  async update(id: number, headquarterDto: HeadquarterDto) {
    const { companyId, supervisorId, ...headquarterData } = headquarterDto;
    const company = await this.companyService.findOne(companyId);
    const headquarter = await this.headquarterRepository.findById(id);

    if (supervisorId) {
      const supervisor = await this.userService.findRole(supervisorId, id);
      return this.headquarterRepository.save({
        ...headquarter,
        ...headquarterData,
        company,
        supervisor,
      });
    } else {
      return this.headquarterRepository.save({
        ...headquarter,
        ...headquarterData,
        company,
      });
    }
  }

  async remove(id: number) {
    const headquarter = await this.headquarterRepository.findById(id);
    await this.headquarterRepository.remove(headquarter);
  }
}
