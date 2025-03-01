import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleNoFoundException extends HttpException {
  constructor(id: any) {
    super(`No se encontro el rol id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}
