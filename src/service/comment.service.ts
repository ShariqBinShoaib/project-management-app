import { CommentDTO } from "../dto/comment.dto";
import { CommentRepository } from "../repository/comment.repository";
import { NotFoundError } from "../errors/NotFoundError";

export class CommentService {
  private commentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async createComment(comment: CommentDTO) {
    const commentPayload: CommentDTO = {
      taskId: comment.taskId,
      authorId: comment.authorId,
      text: comment.text,
    };

    if (comment.parentId) {
      const parent = await this.getCommentById(comment.parentId);
      if (!parent) throw new NotFoundError({ message: "Parent not found" });
      commentPayload.parent = parent;
    }

    console.log(commentPayload);
    const newComment = await this.commentRepository.createComment(
      commentPayload
    );

    return newComment;
  }

  deleteComment(id: number) {
    return this.commentRepository.delete(id);
  }

  getComments() {
    return this.getCommentsTree();
  }

  getCommentById(id: number) {
    return this.commentRepository.findOne(id);
  }

  getCommentsTree() {
    return this.commentRepository.findTrees({ relations: ["author"] });
  }

  // getTaskRootComments(taskId: number) {
  //   return this.commentRepository.find({ taskId, level: 1 });
  // }

  async getRepliesTree(commentId: number) {
    const comment = await this.getCommentById(commentId);

    if (!comment) throw new NotFoundError({ message: "Comment not found" });

    return this.commentRepository.findDescendantsTree(comment);
  }
}

// typeorm v0.2.41
