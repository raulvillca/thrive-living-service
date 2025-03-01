import { HttpException, HttpStatus } from '@nestjs/common';

export class HeadquarterNoFoundException extends HttpException {
  constructor(id: any) {
    super(`No se encontro la sede, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}

export class HeadquarterImageNoFoundException extends HttpException {
  constructor(id: any) {
    super(
      `No se encontro la imagen de la sede, id=[${id}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
