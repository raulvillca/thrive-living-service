import { Global, Module } from '@nestjs/common';
import { SecurityGuard } from './security.guard';
import { JwtStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(`Register module ${configService.getOrThrow<string>('JWT_SECRET')}`);
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {},
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SecurityGuard, RolesGuard, JwtStrategy],
  exports: [SecurityGuard, RolesGuard, JwtStrategy, JwtModule],
})
export class SecurityModule {}
