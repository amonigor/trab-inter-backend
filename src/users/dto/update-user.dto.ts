import { IsString, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ValidateIf((o) => 'description' in o)
  public name: string;

  @IsString()
  @ValidateIf((o) => 'description' in o)
  public password: string;
}
