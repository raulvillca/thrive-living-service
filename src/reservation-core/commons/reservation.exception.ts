import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationNoFoundException extends HttpException {
  constructor(id: any) {
    super(`No se encontro el reservacion, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}

export class CommentNoFoundException extends HttpException {
  constructor(id: any, reservationId: any) {
    super(
      `No se encontro ningun comentario para la reserva = [${reservationId}], id=[${id}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
