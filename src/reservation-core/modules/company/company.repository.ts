import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Company | null> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      console.error('Error in getById:', error);
      return null;
    }
  }
}
