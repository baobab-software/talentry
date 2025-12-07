import { z } from 'zod';

const currentYear = new Date().getFullYear();

/**
 * Employer update schema
 * All fields are optional for partial updates
 */
export const employerUpdateSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Company name should be a string',
      })
      .min(1, 'Company name cannot be empty')
      .optional(),
    industry: z
      .string({
        invalid_type_error: 'Industry should be a string',
      })
      .min(1, 'Industry cannot be empty')
      .optional(),
    websiteUrl: z
      .string({
        invalid_type_error: 'Website URL should be a string',
      })
      .url('Website URL must be a valid URL')
      .optional(),
    location: z
      .string({
        invalid_type_error: 'Location should be a string',
      })
      .min(1, 'Location cannot be empty')
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description should be a string',
      })
      .min(1, 'Description cannot be empty')
      .optional(),
    size: z
      .number({
        invalid_type_error: 'Size should be a number',
      })
      .int('Size should be an integer')
      .min(1, 'Size should be at least 1')
      .optional(),
    foundedIn: z
      .number({
        invalid_type_error: 'Founded year should be a number',
      })
      .int('Founded year should be an integer')
      .min(1800, 'Founded year should be at least 1800')
      .max(currentYear, 'Founded year cannot be in the future')
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type EmployerUpdateData = z.infer<typeof employerUpdateSchema>;
