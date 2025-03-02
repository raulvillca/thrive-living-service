import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(`No se encontro el usuario, id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}

export class EmailNotFoundException extends HttpException {
  constructor(email: string) {
    super(`No se encontro el email, email=[${email}]`, HttpStatus.BAD_REQUEST);
  }
}

export class EmailAlreadyExistException extends HttpException {
  constructor(email: string) {
    super(`El email ya fue registrado, email=[${email}]`, HttpStatus.BAD_REQUEST);
  }
}

export class PasswordMismatchingException extends HttpException {
  constructor(email: string) {
    super(`La contraseña no coincide, email=[${email}]`, HttpStatus.BAD_REQUEST);
  }
}
