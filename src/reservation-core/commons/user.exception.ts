import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(`No se encontro el usuario, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}
