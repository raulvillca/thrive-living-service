import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNoFoundException extends HttpException {
  constructor() {
    super('No se encontro la compania', HttpStatus.BAD_REQUEST);
  }
}
