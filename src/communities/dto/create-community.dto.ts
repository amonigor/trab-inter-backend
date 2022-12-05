import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';
export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public id_category: string;

  @ValidateIf((o) => 'id_user' in o)
  @IsString()
  public id_user?: string;
}
