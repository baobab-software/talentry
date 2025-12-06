import { z } from 'zod';
import { baseRegisterSchema } from './base-register.schema';

/**
 * Employer registration schema
 * Extends base registration with company name and industry
 */
export const employerRegisterSchema = baseRegisterSchema.extend({
  name: z
    .string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name should be a string',
    })
    .min(1, 'Company name cannot be empty'),
  industry: z
    .string({
      required_error: 'Industry is required',
      invalid_type_error: 'Industry should be a string',
    })
    .min(1, 'Industry cannot be empty'),
});

export type EmployerRegisterData = z.infer<typeof employerRegisterSchema>;
