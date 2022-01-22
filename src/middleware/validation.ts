import { NextFunction, Request, Response } from "express";
import { ClassConstructor } from "class-transformer";
import { dtoValidator } from "../utils/dtoValidator";

export function validateReqBody(dto: ClassConstructor<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const objInstance = await dtoValidator(dto, req.body);
      req.body = objInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
}
