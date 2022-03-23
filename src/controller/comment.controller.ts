import { Request, Response } from "express";
import { CommentDTO } from "src/dto/comment.dto";
import { CommentService } from "src/service/comment.service";

export class CommentController {
  private commentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  createComment = async (req: Request, res: Response) => {
    const data: CommentDTO = req.body as CommentDTO;
    const newComment = await this.commentService.createComment(data);
    return res.status(200).json(newComment);
  };

  deleteComment = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id) ?? 0;
    const deletedComment = await this.commentService.deleteComment(id);
    return res.status(200).json(deletedComment);
  };

  getComments = async (_: Request, res: Response) => {
    const comments = await this.commentService.getComments();
    return res.status(200).json(comments);
  };

  getCommentById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id) ?? 0;
    const comment = await this.commentService.getCommentById(id);
    return res.status(200).json(comment);
  };
}
