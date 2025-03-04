import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { UserRoleRepository } from './user_role.repository';
import { HeadquarterModule } from '../headquarter/headquarter.module';

@Module({
  imports: [forwardRef(() => HeadquarterModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository, UserRoleRepository],
  exports: [UserRepository, UserRoleRepository, RoleRepository],
})
export class UserModule {}
