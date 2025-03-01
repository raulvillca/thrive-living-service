import { HttpException, HttpStatus } from '@nestjs/common';

export class DayOfWeekNoFoundException extends HttpException {
  constructor(id: any) {
    super(
      `No se encontra carga para ese dia, id=[${id}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
