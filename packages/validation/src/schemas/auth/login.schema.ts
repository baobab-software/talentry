import { z } from 'zod';
import { emailSchema } from '../shared/email.schema';
import { passwordSchema } from '../shared/password.schema';

/**
 * Login schema
 * Requires email and password
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginData = z.infer<typeof loginSchema>;
