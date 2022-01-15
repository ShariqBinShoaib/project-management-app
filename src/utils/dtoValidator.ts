import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ErrorObject } from "src/errors/BaseError";
import { BadRequestError } from "../errors/BadRequestError";

/**
 *
 * Validate the received payload, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from request body
 *
 * @example
 * ```ts
 *  await dtoValidator(EmployeeDTO, req.body.employee);
 *
 * ```
 */
export const dtoValidator = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    const formattedErrors = errors.reduce(
      (acc: ErrorObject, val: ValidationError) => {
        if (val.constraints !== undefined) {
          if (Object.values(val.constraints).length > 0)
            acc[val.property] = Object.values(val.constraints)[0];
        }
        return acc;
      },
      {}
    );
    throw new BadRequestError(formattedErrors);
  }
};
