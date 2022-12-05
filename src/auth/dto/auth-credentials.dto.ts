import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentials {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
