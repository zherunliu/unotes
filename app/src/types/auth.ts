export interface IUser {
  username: string;
  password: string;
}

export interface IAuth {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
