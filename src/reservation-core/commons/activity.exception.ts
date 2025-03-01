import { HttpException, HttpStatus } from '@nestjs/common';

export class ActivityNoFoundException extends HttpException {
  constructor(id: number) {
    super(`No se encontro la actividad, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}
