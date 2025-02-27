import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  RecoverUserDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from '../../entities/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { OtpService } from '../../infrastructure/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private otpService: OtpService,
  ) {}

  async register(dto: CreateUserDto) {
    const emailExists = await this.userRepository.existsByEmail(dto.email);
    if (emailExists) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  recoverPassword(dto: RecoverUserDto) {
    this.otpService.generateOtp(dto.email);
    return Promise.resolve(true);
  }

  verifyOtp(dto: VerifyOtpDto) {
    return this.otpService.validateOtp(dto.email, dto.otp, dto.expireAt);
  }

  resetPassword(dto: ResetPasswordDto) {
    return Promise.resolve(undefined);
  }
}
