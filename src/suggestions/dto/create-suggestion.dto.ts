import { ContentType, Level, Status, SuggestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuggestionDto {
  @IsEnum(SuggestionType)
  @IsNotEmpty()
  public type: SuggestionType;

  @IsEnum(Status)
  @IsNotEmpty()
  public status: Status;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public link: string;

  @IsString()
  @IsNotEmpty()
  public value: number;

  @IsEnum(Level)
  @IsNotEmpty()
  public level: Level;

  @IsEnum(ContentType)
  @IsNotEmpty()
  public content_type: ContentType;

  @IsString()
  @IsNotEmpty()
  public id_content?: string;

  @IsString()
  @IsNotEmpty()
  public id_user: string;
}
