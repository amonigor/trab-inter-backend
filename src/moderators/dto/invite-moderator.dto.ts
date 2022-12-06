import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class InviteModeratorDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public id_community: string;
}
