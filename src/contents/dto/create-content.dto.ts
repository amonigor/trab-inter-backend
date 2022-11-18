import { ContentType, Level } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public link: string;

  @IsNumber()
  @IsNotEmpty()
  public value: number;

  @IsEnum(Level)
  @IsNotEmpty()
  public level: Level;

  @IsEnum(ContentType)
  @IsNotEmpty()
  public type: ContentType;

  @IsString()
  @IsNotEmpty()
  public id_community: string;
}
