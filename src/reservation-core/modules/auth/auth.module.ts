import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpService } from '../../infrastructure/otp.service';
import { HashService } from '../../infrastructure/hash.service';
import { ImageService } from '../../infrastructure/image.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { SecurityModule } from '../../../security/security.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule, InfrastructureModule, SecurityModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, OtpService, HashService, ImageService],
  exports: [AuthService],
})
export class AuthModule {}
