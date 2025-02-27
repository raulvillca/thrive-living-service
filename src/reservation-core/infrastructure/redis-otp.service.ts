import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisOtpService {
  private readonly logger = new Logger(RedisOtpService.name);
  private redisClient: Redis;

  constructor(@Inject('REDIS_CLIENT') redisClient: Redis) {
    this.redisClient = redisClient;
  }

  async setOtp(email: string, otp: string, ttlSeconds: number): Promise<void> {
    const valueString = JSON.stringify({
      email: email,
      otp: otp,
      expireAt: ttlSeconds,
    });
    await this.redisClient.set(`otp:${email}`, valueString, 'EX', ttlSeconds);
  }

  async getOtp(
    email: string,
  ): Promise<{ email: string; otp: string; expireAt: number } | null> {
    const value = await this.redisClient.get(`otp:${email}`);
    return value != null ? JSON.parse(value) : null;
  }

  async deleteOtp(email: string): Promise<void> {
    await this.redisClient.del(`otp:${email}`);
  }
}
