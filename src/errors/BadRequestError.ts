import { BaseError, ErrorObject, SerializedErrors } from "./BaseError";

export class BadRequestError extends BaseError {
  statusCode: number = 400;

  constructor(private errors: ErrorObject) {
    super("Validation Failed");
  }

  serializeErrors(): SerializedErrors {
    return { code: this.statusCode, messages: this.errors };
  }
}
