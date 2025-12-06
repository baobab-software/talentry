import { z } from 'zod';
import { passwordSchema } from '../shared/password.schema';

/**
 * Reset password schema
 * Requires new password
 */
export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
