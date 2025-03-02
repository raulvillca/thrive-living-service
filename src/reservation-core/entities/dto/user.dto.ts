export interface UserDto {
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  password: string;
  age: string;
  observation?: string;
  phone?: string;
  goal?: string;
  roleId?: number;
  headquarterId: number;
}

export type LoginJWTDto = {
  accessType: string;
  accessToken: string;
  exp: number;
};

export type UserResponseDto = Omit<UserDto, 'password' | 'roleId'> & {
  startingDate: Date;
  imageUrl?: string;
  active: boolean;
  frequent: boolean;
  role: string;
};

export type LoginUserDto = Omit<
  UserDto,
  | 'name'
  | 'surname'
  | 'age'
  | 'roleId'
  | 'birthdate'
  | 'goal'
  | 'observation'
  | 'phone'
>;
export type RecoverUserDto = Omit<LoginUserDto, 'password'>;
export type ResetPasswordDto = LoginUserDto & {
  newPassword: string;
};

export type VerifyOtpDto = RecoverUserDto & {
  otp: string;
  expireAt: number;
};
