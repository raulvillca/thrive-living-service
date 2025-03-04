import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  RecoverUserDto,
  ResetPasswordDto,
  UserDto,
  VerifyOtpDto,
} from '../../entities/dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @Post('register')
  register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @Post('recover')
  recover(@Body() dto: RecoverUserDto) {
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
