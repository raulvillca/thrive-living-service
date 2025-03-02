import { HttpException, HttpStatus } from '@nestjs/common';

export class RedisException extends HttpException {
  constructor() {
    super('No se pudo ejecutar redis', HttpStatus.BAD_REQUEST);
  }
}
