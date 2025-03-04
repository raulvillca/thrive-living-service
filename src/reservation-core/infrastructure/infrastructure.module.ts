import { Global, Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { PushNotificationService } from './push-notification.service';
import { RedisOtpService } from './redis-otp.service';
import { RedisFactory } from './config/redis-client.factory';
import { HashService } from './hash.service';
import { ImageService } from './image.service';
import { MinioFactory } from './config/minio.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config/mailer.factory';
import { databaseConfig } from './config/database.factory';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => mailerConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
    }),
  ],
  providers: [
    MinioFactory,
    RedisFactory,
    OtpService,
    MailService,
    PushNotificationService,
    HashService,
    RedisOtpService,
    ImageService,
  ],
  exports: [
    'REDIS_CLIENT',
    'MINIO_CLIENT',
    TypeOrmModule,
    MailerModule,
    OtpService,
    MailService,
    PushNotificationService,
    RedisOtpService,
    ImageService,
    HashService,
  ],
})
export class InfrastructureModule {}
