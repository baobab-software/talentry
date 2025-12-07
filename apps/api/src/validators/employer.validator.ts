import { IEmployer } from '@work-whiz/interfaces';
import { employerUpdateSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const employerValidator = (employer: Partial<IEmployer>) => {
  try {
    employerUpdateSchema.parse(employer);
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
