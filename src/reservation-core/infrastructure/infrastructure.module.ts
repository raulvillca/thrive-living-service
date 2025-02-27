import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { PushNotificationService } from './push-notification.service';
import { RedisOtpService } from './redis-otp.service';
import { RedisClientFactory } from './redis-client.factory';

@Module({
  providers: [
    RedisClientFactory.build(),
    OtpService,
    MailService,
    PushNotificationService,
  ],
  exports: [
    'REDIS_CLIENT',
    OtpService,
    MailService,
    PushNotificationService,
    RedisOtpService,
  ],
})
export class InfrastructureModule {}
