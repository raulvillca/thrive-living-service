import { Injectable } from '@nestjs/common';
import {
  LoginUserDto,
  RecoverUserDto,
  ResetPasswordDto,
  UserDto,
  VerifyOtpDto,
} from '../../entities/dto/user.dto';
import { UserRepository } from '../user/user.repository';
import { OtpService } from '../../infrastructure/otp.service';
import { ImageService } from '../../infrastructure/image.service';
import {
  EmailAlreadyExistException,
  PasswordMismatchingException,
} from '../../commons/user.exception';
import { HashService } from '../../infrastructure/hash.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly hashService: HashService,
    private readonly imageService: ImageService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(dto.email, dto.headquarterId);
    const validatePassword = await this.hashService.compare(dto.password, user.password);
    if (!validatePassword) {
      throw new PasswordMismatchingException(dto.email);
    }
    return user;
  }

  async register(dto: UserDto) {
    const emailExists = await this.userRepository.existsByEmail(dto.email, dto.headquarterId);
    if (emailExists) {
      throw new EmailAlreadyExistException(dto.email);
    }
    const hashedPassword = await this.hashService.hash(dto.password);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async saveImage() {}

  async recoverPassword(dto: RecoverUserDto) {
    await this.otpService.generateOtp(dto.email, dto.headquarterId);
    return Promise.resolve(true);
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const result = await this.otpService.validateOtp(
      dto.email,
      dto.headquarterId,
      dto.otp,
      dto.expireAt,
    );
    await this.otpService.otpConfirm(dto.email, dto.headquarterId);
    this.otpService.otpDelete(dto.email, dto.headquarterId);
    return result;
  }

  async resetPassword(dto: ResetPasswordDto) {
    await this.otpService.isOtpConfirmed(dto.email, dto.headquarterId);
    if (dto.password != dto.newPassword) {
      throw new PasswordMismatchingException(dto.email);
    }
    const encryptedPassword = await this.hashService.hash(dto.password);
    const user = await this.userRepository.findByEmail(dto.email, dto.headquarterId);
    const resetUser = {
      ...user,
      password: encryptedPassword,
    } as User;
    await this.userRepository.save(resetUser);
    //TODO enviar mail de que se reseteo el password
    return Promise.resolve(true);
  }
}
