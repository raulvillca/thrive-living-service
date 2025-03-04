import { HttpException, HttpStatus } from '@nestjs/common';

export class OtpMismatchException extends HttpException {
  constructor() {
    super('OTP no coincide', HttpStatus.BAD_REQUEST);
  }
}

export class OtpExpiredException extends HttpException {
  constructor() {
    super('OTP expiro', HttpStatus.BAD_REQUEST);
  }
}

export class OtpNotConfirmationException extends HttpException {
  constructor() {
    super('No posee confirmacion OTP', HttpStatus.BAD_REQUEST);
  }
}
