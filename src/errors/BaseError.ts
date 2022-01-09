export type ErrorObject = {
  [key: string]: string[];
};

export abstract class BaseError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
  abstract serializeErrors(): ErrorObject;
}
