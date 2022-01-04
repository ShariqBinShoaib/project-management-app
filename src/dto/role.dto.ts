import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RoleDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;
}
