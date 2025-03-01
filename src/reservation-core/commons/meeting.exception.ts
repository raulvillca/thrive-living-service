import { HttpException, HttpStatus } from '@nestjs/common';

export class MeetingNoFoundException extends HttpException {
  constructor(id: any) {
    super(`No se encontro el meeting, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}

export class MeetingCalendarNoFoundException extends HttpException {
  constructor(id: any) {
    super(
      `No se encontro el meeting calendar, id=[${id}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
