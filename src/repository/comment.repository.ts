import { TreeRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { CommentDTO } from "../dto/comment.dto";
import { dataSource } from "../startup/db";

export type CommentRepository = TreeRepository<Comment> & {
  createComment(role: CommentDTO): Promise<Comment>;
};

export const commentRepository: CommentRepository = dataSource.getTreeRepository(Comment).extend({
  async createComment(comment: CommentDTO) {
    const newComment = new Comment(comment);
    await newComment.save();
    return newComment;
  },
});
