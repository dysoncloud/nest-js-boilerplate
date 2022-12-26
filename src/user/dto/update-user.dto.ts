import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  re_password: string;
}
