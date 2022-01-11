import { NextFunction, Request, Response } from "express";

type Handler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export default function (handler: Handler) {
  const routeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return routeHandler;
}
