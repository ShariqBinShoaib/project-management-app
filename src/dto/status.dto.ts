import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Expose } from "class-transformer";

export class StatusDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}
