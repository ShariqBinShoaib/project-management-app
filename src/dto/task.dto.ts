import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { Expose } from "class-transformer";

export class TaskDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  description: string;

  @Expose()
  @IsOptional()
  statusId: number;

  @Expose()
  @IsNotEmpty()
  projectId: number;

  @Expose()
  @IsNotEmpty()
  reporterId: number;

  @Expose()
  @IsNotEmpty()
  assigneeId: number;
}
