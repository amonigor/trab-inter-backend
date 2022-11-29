import { IsString, IsNotEmpty } from 'class-validator';
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
}
