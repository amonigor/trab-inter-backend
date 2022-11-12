import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommunityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;
}
