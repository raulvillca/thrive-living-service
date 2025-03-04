import { Injectable } from '@nestjs/common';
import { CompanyDto } from '../../entities/dto/company.dto';
import { CompanyRepository } from './company.repository';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  create(companyDto: CompanyDto) {
    const company = this.companyRepository.create({
      ...companyDto,
      active: true,
    });
    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.findAll();
  }

  findOne(id: number) {
    return this.companyRepository.findById(id);
  }

  async update(id: number, companyDto: CompanyDto) {
    const company = await this.companyRepository.findById(id);
    const updatedCompany = { ...companyDto, id: company.id } as Company;
    return this.companyRepository.save(updatedCompany);
  }

  async remove(id: number) {
    const company = await this.companyRepository.findById(id);
    company.active = false;
  }
}
