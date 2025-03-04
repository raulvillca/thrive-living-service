import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { SecurityGuard } from '../../../security/security.guard';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, SecurityGuard],
})
export class CompanyModule {}
