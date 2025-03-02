import { Injectable } from '@nestjs/common';
import { RedisOtpService } from './redis-otp.service';
import {
  OtpExpiredException,
  OtpMismatchException,
  OtpNotConfirmationException,
} from '../commons/otp.exception';

@Injectable()
export class OtpService {
  constructor(private readonly redisOtpService: RedisOtpService) {}

  async generateOtp(email: string, headquarterId: number, ttl = 300) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return this.redisOtpService.setOtp(email, headquarterId, otp, ttl);
  }

  async validateOtp(email: string, headquarterId: number, otp: string, expireAt: number) {
    const storedOtp = await this.redisOtpService.getOtp(email, headquarterId);

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

  otpDelete(email: string, headquarterId: number) {
    void this.redisOtpService.deleteOtp(email, headquarterId).then();
  }

  otpConfirm(email: string, headquarterId: number) {
    return this.redisOtpService.setConfirm(email, headquarterId);
  }

  async isOtpConfirmed(email: string, headquarterId: number) {
    const result = await this.redisOtpService.getConfirm(email, headquarterId);
    if (!result) {
      throw new OtpNotConfirmationException();
    }
    return result;
  }
}
