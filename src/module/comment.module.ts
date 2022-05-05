import express from "express";
import { commentRepository } from "../repository/comment.repository";
import { CommentService } from "../service/comment.service";
import { CommentController } from "../controller/comment.controller";
import { CommentDTO } from "../dto/comment.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerCommentModule() {
  const router = express.Router();

  const commentService = new CommentService(commentRepository);
  const commentController = new CommentController(commentService);

  router.get("/:id", asyncMiddleware(commentController.getCommentById));
  router.post("/", validateReqBody(CommentDTO), asyncMiddleware(commentController.createComment));
  router.delete("/:id", asyncMiddleware(commentController.deleteComment));
  router.get("/:id/replies", asyncMiddleware(commentController.getCommentReplies));

  return router;
}
