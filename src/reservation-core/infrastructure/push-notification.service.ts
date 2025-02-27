import { Injectable } from '@nestjs/common';

@Injectable()
export class PushNotificationService {
  async sendNotification(token: string, title: string, message: string) {
    // Aquí podrías usar Firebase Cloud Messaging (FCM) o OneSignal
    console.log(`Enviando notificación push a ${token}: ${title} - ${message}`);
    return Promise.resolve(undefined);
  }
}
