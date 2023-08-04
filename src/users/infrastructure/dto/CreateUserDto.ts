import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;
}
