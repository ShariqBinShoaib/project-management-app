import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Expose } from "class-transformer";
import { User } from "src/entity/User";

export class ProjectDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  key: string;

  @Expose()
  @IsArray()
  userIds: number[];

  @Expose()
  @IsArray()
  @IsOptional()
  users: User[];
}
