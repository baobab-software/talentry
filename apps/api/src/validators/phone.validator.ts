import { phoneSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const phoneValidator = (phone: string) => {
  try {
    phoneSchema.parse(phone);
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
