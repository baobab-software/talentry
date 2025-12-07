/**
 *
 *
 *
 */
import { passwordSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const passwordValidator = (password: string) => {
  try {
    passwordSchema.parse(password);
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
