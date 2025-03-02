import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleNoFoundException extends HttpException {
  constructor(id: any) {
    super(`No se encontro el rol id=[${id}]`, HttpStatus.BAD_REQUEST);
  }
}

export class UserRoleNoFoundException extends HttpException {
  constructor(userId: any, roleId: any) {
    super(`No se encontro el rol, userId=[${userId}] roleId=[${roleId}]`, HttpStatus.BAD_REQUEST);
  }
}

export class UserRoleReallyExistException extends HttpException {
  constructor(userId: any, roleId: any) {
    super(
      `El usuario ya cuenta con este rol, userId=[${userId}] roleId=[${roleId}]`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
