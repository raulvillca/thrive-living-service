import { HttpException, HttpStatus } from '@nestjs/common';

export class TimeGridNoFoundException extends HttpException {
  constructor(id: any) {
    super(
      `No se encontro el grilla horaria id=[${id}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
