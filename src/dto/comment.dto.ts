import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Expose } from "class-transformer";
import { Comment } from "../entity/Comment";

export class CommentDTO {
  @Expose()
  @IsNotEmpty()
  taskId: number;

  @Expose()
  @IsNotEmpty()
  authorId: number;

  @Expose()
  @IsOptional()
  parentId?: number;

  @IsOptional()
  parent?: Comment;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  text: string;

  @IsOptional()
  level?: number;
}
