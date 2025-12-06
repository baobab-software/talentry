import { z } from 'zod';

/**
 * Admin update schema
 * All fields are optional for partial updates
 */
export const adminUpdateSchema = z
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
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type AdminUpdateData = z.infer<typeof adminUpdateSchema>;
