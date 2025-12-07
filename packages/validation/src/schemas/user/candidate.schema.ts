import { z } from 'zod';

/**
 * Candidate update schema
 * All fields are optional for partial updates
 */
export const candidateUpdateSchema = z
  .object({
    firstName: z
      .string({
        invalid_type_error: 'First name should be a string',
      })
      .min(1, 'First name cannot be empty')
      .regex(/^[A-Za-z]+$/, 'First name can only contain letters')
      .optional(),
    lastName: z
      .string({
        invalid_type_error: 'Last name should be a string',
      })
      .min(1, 'Last name cannot be empty')
      .regex(/^[A-Za-z]+$/, 'Last name can only contain letters')
      .optional(),
    title: z
      .string({
        invalid_type_error: 'Title should be a string',
      })
      .min(1, 'Title cannot be empty')
      .optional(),
    skills: z
      .array(z.string(), {
        invalid_type_error: 'Skills should be an array of strings',
      })
      .optional(),
    isEmployed: z
      .boolean({
        invalid_type_error: 'isEmployed should be a boolean',
      })
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type CandidateUpdateData = z.infer<typeof candidateUpdateSchema>;
