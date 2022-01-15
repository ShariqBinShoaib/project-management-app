import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export enum ValidRoles {
  ADMIN = "admin",
  ASSIGNEE = "assignee",
  REPORTER = "reporter",
}

export class RoleDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  @IsEnum(ValidRoles, { message: "Invalid role provided" })
  name: string;
}
