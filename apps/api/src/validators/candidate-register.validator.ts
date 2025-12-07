import { candidateRegisterSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const candidateRegisterValidator = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    candidateRegisterSchema.parse(data);
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
