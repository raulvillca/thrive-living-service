import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';
import { CompanyNoFoundException } from '../../commons/company.exception';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Company> {
    const company = await this.findOne({ where: { id } });
    if (!company) {
      throw new CompanyNoFoundException();
    }
    return company;
  }
}
