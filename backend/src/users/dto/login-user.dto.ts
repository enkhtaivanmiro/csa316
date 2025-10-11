import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly usernameOrEmail: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}