import { PartialType } from '@nestjs/mapped-types';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateSuggestionDto } from './create-suggestion.dto';

export class UpdateSuggestionDto extends PartialType(CreateSuggestionDto) {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsEnum(Status)
  @IsNotEmpty()
  public status: Status;
}
