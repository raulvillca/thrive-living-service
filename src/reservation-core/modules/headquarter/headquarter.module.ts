import { Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { HeadquarterRepository } from './headquarter.repository';
import { CompanyRepository } from '../company/company.repository';
import { RoleRepository } from '../user/role.repository';

@Module({
  controllers: [HeadquarterController],
  providers: [HeadquarterService, HeadquarterRepository, CompanyRepository, RoleRepository],
})
export class HeadquarterModule {}
