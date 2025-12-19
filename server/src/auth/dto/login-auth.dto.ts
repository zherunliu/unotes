import { IsNotEmpty, Length } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'username can not be null' })
  username: string;
  @IsNotEmpty()
  @Length(6, 20, {
    message: 'password length should between 6 and 20',
  })
  password: string;
}
