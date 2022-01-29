import { BaseError, ErrorObject, SerializedErrors } from "./BaseError";

export class NotFoundError extends BaseError {
  statusCode: number = 404;

  constructor(private errors: ErrorObject) {
    super("Not found!!");
  }

  serializeErrors(): SerializedErrors {
    return { code: this.statusCode, messages: this.errors };
  }
}
