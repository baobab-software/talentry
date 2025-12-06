import { IAdmin } from '@work-whiz/interfaces';
import { adminUpdateSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const adminValidator = (admin: Partial<IAdmin>) => {
  try {
    adminUpdateSchema.parse(admin);
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
