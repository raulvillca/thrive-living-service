import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RecoverUserDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from '../../entities/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('recover')
  async recover(@Body() dto: RecoverUserDto) {
    return this.authService.recoverPassword(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('reset-password')
  async reset(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
