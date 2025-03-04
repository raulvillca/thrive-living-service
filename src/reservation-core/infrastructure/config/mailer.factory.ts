import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const mailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: false,
    auth: {
      user: configService.getOrThrow<string>('MAIL_USER'),
      pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: configService.getOrThrow<string>('MAIL_FROM'),
  },
  template: {
    dir: configService.getOrThrow<string>('MAIL_TEMPLATES'),
    adapter: new HandlebarsAdapter(),
    options: { strict: true },
  },
});
