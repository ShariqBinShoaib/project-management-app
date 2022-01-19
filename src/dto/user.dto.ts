import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Max,
} from "class-validator";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Max(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password is too weak, it must be comprised of atleast 1 uppercase, 1 lowercase, 1 special character and 1 digit",
  })
  password: string;
}
