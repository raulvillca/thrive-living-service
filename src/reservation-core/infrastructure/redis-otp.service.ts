import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisException } from '../commons/redis.exception';

@Injectable()
export class RedisOtpService {
  private readonly logger = new Logger(RedisOtpService.name);
  private redisClient: Redis;
  private static CONFIRMED: string = 'confirmed';

  constructor(@Inject('REDIS_CLIENT') redisClient: Redis) {
    this.redisClient = redisClient;
  }

  async setOtp(email: string, headquarterId: number, otp: string, ttlSeconds: number) {
    const valueString = JSON.stringify({
      email: email,
      otp: otp,
      expireAt: ttlSeconds,
    });
    return this.evaluateResult(
      await this.redisClient.set(
        this.otpGeneratedKey(email, headquarterId),
        valueString,
        'EX',
        ttlSeconds,
      ),
    );
  }

  async getOtp(
    email: string,
    headquarterId: number,
  ): Promise<{ email: string; otp: string; expireAt: number } | null> {
    const value = await this.redisClient.get(this.otpGeneratedKey(email, headquarterId));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value != null ? JSON.parse(value) : null;
  }

  async setConfirm(email: string, headquarterId: number) {
    return this.evaluateResult(
      await this.redisClient.set(
        this.optConfirmedKey(email, headquarterId),
        RedisOtpService.CONFIRMED,
      ),
    );
  }

  async getConfirm(email: string, headquarterId: number) {
    const result = await this.redisClient.get(this.optConfirmedKey(email, headquarterId));
    return RedisOtpService.CONFIRMED == result;
  }

  async deleteOtp(email: string, headquarterId: number): Promise<void> {
    await this.redisClient.del(this.otpGeneratedKey(email, headquarterId));
  }

  otpGeneratedKey(email: string, headquarterId: number) {
    return `otp-generation:${email}-${headquarterId}`;
  }

  optConfirmedKey(email: string, headquarterId: number) {
    return `otp-confirmed:${email}-${headquarterId}`;
  }

  private evaluateResult(result: string) {
    if (result !== 'OK') {
      throw new RedisException();
    }
    return true;
  }
}
