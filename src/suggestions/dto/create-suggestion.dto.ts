import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuggestionDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsEnum(Status)
  @IsNotEmpty()
  public status: Status;

  @IsString()
  @IsNotEmpty()
  public id_user: string;
}
