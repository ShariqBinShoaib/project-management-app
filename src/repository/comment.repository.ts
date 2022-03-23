import { EntityRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { CommentDTO } from "../dto/comment.dto";
import { BaseTreeRepository } from "./BaseTreeRepository";

@EntityRepository(Comment)
export class CommentRepository extends BaseTreeRepository<Comment> {
  async createComment(comment: CommentDTO) {
    const newComment = new Comment(comment);
    await newComment.save();
    return newComment;
  }
}
