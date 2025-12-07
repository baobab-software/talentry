import { IJob } from '@work-whiz/interfaces';
import { jobCreateSchema, jobUpdateSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const validateJob = (jobData: Partial<IJob>, isUpdate?: boolean) => {
  try {
    if (isUpdate) {
      jobUpdateSchema.parse(jobData);
    } else {
      jobCreateSchema.parse(jobData);
    }
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
