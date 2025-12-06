import { z } from 'zod';

/**
 * Password validation schema with strong security requirements:
 * - Minimum 12 characters, maximum 64 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password should be alphanumeric with special characters.',
  })
  .min(12, 'Password should be at least 12 characters long.')
  .max(64, 'Password should not exceed 64 characters.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
  );

export type PasswordData = z.infer<typeof passwordSchema>;
