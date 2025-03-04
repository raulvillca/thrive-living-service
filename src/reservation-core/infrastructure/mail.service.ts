import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export enum MailTemplate {
  WELCOME = 'welcome',
  PASSWORD_RESET = 'password-reset',
  OTP_RECOVERY = 'otp-recovery',
}

export const MAIL_TEMPLATES: Record<MailTemplate, { subject: string; file: string }> = {
  [MailTemplate.WELCOME]: {
    subject: '¡Bienvenido a nuestra plataforma!',
    file: 'welcome',
  },
  [MailTemplate.PASSWORD_RESET]: {
    subject: 'Recuperación de contraseña',
    file: 'password-reset',
  },
  [MailTemplate.OTP_RECOVERY]: {
    subject: 'Código de recuperación de cuenta',
    file: 'otp-recovery',
  },
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, template: MailTemplate, context: { name: string; otpCode: string }) {
    const mailConfig = MAIL_TEMPLATES[template];

    if (!mailConfig) {
      throw new Error(`El template '${template}' no está configurado.`);
    }

    try {
      await this.mailerService.sendMail({
        to,
        subject: mailConfig.subject,
        template: mailConfig.file,
        context,
      });
      console.log(`Email enviado con el template: ${mailConfig.file}`);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }

  async sendOtpRecoveryEmail(to: string, name: string, otpCode: string) {
    return this.sendMail(to, MailTemplate.OTP_RECOVERY, { name, otpCode });
  }
}
