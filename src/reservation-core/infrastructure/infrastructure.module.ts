import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { PushNotificationService } from './push-notification.service';
import { RedisOtpService } from './redis-otp.service';
import { RedisClientFactory } from './redis-client.factory';
import { DatabaseFactory } from './database.factory';
import { HashService } from './hash.service';

@Module({
  providers: [
    DatabaseFactory.build(),
    RedisClientFactory.build(),
    OtpService,
    MailService,
    PushNotificationService,
    HashService,
  ],
  exports: [
    'DATABASE_CONNECTION',
    'REDIS_CLIENT',
    OtpService,
    MailService,
    PushNotificationService,
    RedisOtpService,
  ],
})
export class InfrastructureModule {}
