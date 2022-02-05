import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  ArrayMinSize,
  IsArray,
} from "class-validator";
import { Expose } from "class-transformer";

export class UserDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password is too weak, it must be comprised of atleast 1 uppercase, 1 lowercase, 1 special character and 1 digit",
  })
  password: string;

  @Expose()
  @IsNotEmpty()
  roleId: number;
}

export class UserIdsDTO {
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  userIds: number[];
}
