import { ContentType, Level, SuggestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateSuggestionDto {
  @IsEnum(SuggestionType)
  @IsNotEmpty()
  public type: SuggestionType;

  @ValidateIf((o) => 'description' in o)
  @IsString()
  public description?: string;

  @ValidateIf((o) => 'link' in o)
  @IsString()
  public link?: string;

  @ValidateIf((o) => 'value' in o)
  @IsString()
  public value?: number;

  @ValidateIf((o) => 'level' in o)
  @IsEnum(Level)
  public level?: Level;

  @ValidateIf((o) => 'content_type' in o)
  @IsEnum(ContentType)
  public content_type?: ContentType;

  @IsString()
  @IsNotEmpty()
  public id_community: string;

  @ValidateIf((o) => 'id_content' in o)
  @IsString()
  public id_content?: string;

  @IsString()
  @IsNotEmpty()
  public id_user: string;
}
