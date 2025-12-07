import { ICandidate } from '@work-whiz/interfaces';
import { candidateUpdateSchema } from '@talentry/validation';
import { ZodError } from 'zod';

export const candidateValidator = (candidate: Partial<ICandidate>) => {
  try {
    candidateUpdateSchema.parse(candidate);
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
