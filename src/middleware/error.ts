import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";

export function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again later" });
}
