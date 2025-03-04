import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpService } from '../../infrastructure/otp.service';
import { HashService } from '../../infrastructure/hash.service';
import { ImageService } from '../../infrastructure/image.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { UserRepository } from '../user/user.repository';
import { UserRoleRepository } from '../user/user_role.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SecurityModule } from '../../../security/security.module';
import { JwtStrategy } from '../../../security/jwt-strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, InfrastructureModule, SecurityModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    OtpService,
    HashService,
    ImageService,
    UserRepository,
    UserRoleRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
