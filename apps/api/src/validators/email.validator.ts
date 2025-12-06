import { emailSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const emailValidator = (email: string) => {
  try {
    emailSchema.parse(email);
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
