import { ArrayMinSize, IsArray } from "class-validator";
import { Expose } from "class-transformer";

export class UserIdsDTO {
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  userIds: number[];
}
