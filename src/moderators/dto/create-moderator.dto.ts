import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModeratorDto {
  @IsString()
  @IsNotEmpty()
  public id_user: string;

  @IsString()
  @IsNotEmpty()
  public id_community: string;
}
