import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';
import { CompanyNoFoundException } from '../../commons/company.exception';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class CompanyRepository {
  private repository: Repository<Company>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Company);
  }

  async findById(id: number): Promise<Company> {
    const company = await this.repository.findOne({ where: { id } });
    if (!company) {
      throw new CompanyNoFoundException();
    }
    return company;
  }

  findAll() {
    return this.repository.find({
      where: { active: true },
    });
  }

  create(company: DeepPartial<Company>) {
    return this.repository.create(company);
  }

  save(company: Company) {
    return this.repository.save(company);
  }
}
