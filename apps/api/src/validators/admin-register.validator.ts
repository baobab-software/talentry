import { IAdminRegister } from '@work-whiz/interfaces';
import { adminRegisterSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const adminRegisterValidator = (data: IAdminRegister) => {
  try {
    adminRegisterSchema.parse(data);
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
