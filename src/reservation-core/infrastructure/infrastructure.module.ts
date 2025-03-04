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

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: configService.getOrThrow<boolean>('DB_SYNCHRONIZE'),
        logging: configService.getOrThrow<boolean>('DB_LOGGING'),
      }),
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
    OtpService,
    MailService,
    PushNotificationService,
    RedisOtpService,
    ImageService,
    HashService,
  ],
})
export class InfrastructureModule {}
