import { z } from 'zod';
import { baseRegisterSchema } from './base-register.schema';

/**
 * Candidate registration schema
 * Extends base registration with firstName and lastName
 */
export const candidateRegisterSchema = baseRegisterSchema.extend({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name should be a string',
    })
    .min(1, 'First name cannot be empty')
    .regex(/^[A-Za-z]+$/, 'First name can only contain letters'),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name should be a string',
    })
    .min(1, 'Last name cannot be empty')
    .regex(/^[A-Za-z]+$/, 'Last name can only contain letters'),
});

export type CandidateRegisterData = z.infer<typeof candidateRegisterSchema>;
