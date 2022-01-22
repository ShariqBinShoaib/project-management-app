import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ErrorObject } from "src/errors/BaseError";
import { BadRequestError } from "../errors/BadRequestError";

/**
 *
 * Validate the received payload, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from request body
 * @returns {ClassConstructor<any>} object converted to class instance
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
): Promise<T> => {
  // tranform the literal object to class object
  const objInstance: T = plainToInstance(dto, obj, {
    excludeExtraneousValues: true,
  });
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    const formattedErrors = errors.reduce(
      (acc: ErrorObject, val: ValidationError) => {
        if (val.constraints !== undefined) {
          const errorValues = Object.values(val.constraints);
          if (errorValues.length > 0) acc[val.property] = errorValues[0];
        }
        return acc;
      },
      {}
    );
    throw new BadRequestError(formattedErrors);
  }
  return objInstance;
};
