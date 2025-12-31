import { IsNotEmpty, Length } from 'class-validator';

export class UpdateAuthDto {
  @IsNotEmpty({ message: 'old password can not be null' })
  oldPassword: string;

  @IsNotEmpty({ message: 'password can not be null' })
  @Length(6, 20, {
    message: 'password length should between 6 and 20',
  })
  newPassword: string;

  @IsNotEmpty({ message: 'password can not be null' })
  @Length(6, 20, {
    message: 'password length should between 6 and 20',
  })
  confirmPassword: string;
}
