import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Expose } from "class-transformer";

export enum ValidRoles {
  ADMIN = "admin",
  ASSIGNEE = "assignee",
  REPORTER = "reporter",
}

export class RoleDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  @IsEnum(ValidRoles, { message: "Invalid role provided" })
  name: string;
}
