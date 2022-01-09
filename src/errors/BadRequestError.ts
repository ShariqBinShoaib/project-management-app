import { ValidationError } from "class-validator";
import { BaseError, ErrorObject } from "./BaseError";

export class BadRequestError extends BaseError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid Request Parameters");
  }

  serializeErrors(): ErrorObject {
    const errors = this.errors.reduce(
      (acc: ErrorObject, val: ValidationError) => {
        if (val.constraints !== undefined) {
          acc[val.property] = Object.values(val.constraints);
        }
        return acc;
      },
      {}
    );
    return errors;
  }
}
