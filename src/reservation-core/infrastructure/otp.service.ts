import { Injectable } from '@nestjs/common';
import { RedisOtpService } from './redis-otp.service';
import {
  OtpExpiredException,
  OtpMismatchException,
} from '../commons/otp.exception';

@Injectable()
export class OtpService {
  constructor(private readonly redisOtpService: RedisOtpService) {}

  async generateOtp(email: string, ttl = 300): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redisOtpService.setOtp(email, otp, ttl);
    return otp;
  }

  async validateOtp(
    email: string,
    otp: string,
    expireAt: number,
  ): Promise<boolean> {
    const storedOtp = await this.redisOtpService.getOtp(email);

    if (!storedOtp) {
      throw new OtpMismatchException();
    }

    if (storedOtp.email !== email || storedOtp.otp !== otp) {
      throw new OtpMismatchException();
    }

    if (storedOtp.expireAt <= expireAt) {
      throw new OtpExpiredException();
    }

    return true;
  }
}
