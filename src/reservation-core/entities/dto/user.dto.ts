export interface UpdateUserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  age: string;
}

export type CreateUserDto = Omit<UpdateUserDto, 'id'>;
export type LoginUserDto = Omit<CreateUserDto, 'name' | 'surname' | 'age'>;
export type RecoverUserDto = Omit<LoginUserDto, 'password'>;
export type ResetPasswordDto = LoginUserDto & {
  newPassword: string;
};

export interface VerifyOtpDto {
  otp: string;
  expireAt: number;
  email: string;
}
