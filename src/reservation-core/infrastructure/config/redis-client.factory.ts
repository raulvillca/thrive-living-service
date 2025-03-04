import { FactoryProvider, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisClientFactory {
  private readonly logger = new Logger(RedisClientFactory.name);

  constructor(private readonly configService: ConfigService) {}

  createClient(): Redis {
    try {
      return new Redis({
        host: this.configService.get<string>('REDIS_HOST', 'localhost'),
        port: this.configService.get<number>('REDIS_PORT', 6379),
        db: this.configService.get<number>('REDIS_DB', 0),
      });
    } catch (error) {
      this.logger.error('Error creating Redis client:', error);
      throw error;
    }
  }
}

export const RedisFactory: FactoryProvider<Redis> = {
  provide: 'REDIS_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new Redis({
      host: configService.get<string>('REDIS_HOST', 'localhost'),
      port: configService.get<number>('REDIS_PORT', 6379),
      db: configService.get<number>('REDIS_DB', 0),
    });
  },
  inject: [ConfigService],
};
