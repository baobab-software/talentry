import { z } from 'zod';
import { emailSchema } from '../shared/email.schema';

/**
 * Forgot password schema
 * Requires only email
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
