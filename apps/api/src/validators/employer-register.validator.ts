import { IEmployerRegister } from '@work-whiz/interfaces';
import { employerRegisterSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const employerRegisterValidator = (data: IEmployerRegister) => {
  try {
    employerRegisterSchema.parse(data);
    return undefined;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        message: error.errors[0].message,
        details: error.errors.map(err => ({
          message: err.message,
          path: err.path,
        })),
      };
    }
    throw error;
  }
};
