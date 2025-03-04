import { forwardRef, Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { HeadquarterRepository } from './headquarter.repository';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => CompanyModule)],
  controllers: [HeadquarterController],
  providers: [HeadquarterService, HeadquarterRepository],
  exports: [HeadquarterRepository],
})
export class HeadquarterModule {}
