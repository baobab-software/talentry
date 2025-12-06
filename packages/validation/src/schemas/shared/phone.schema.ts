import { z } from 'zod';

/**
 * International phone number validation schema
 * Format: +[country code][number]
 * Example: +27123456789
 * Pattern: +[1-9]{1,4}\d{7,14}
 */
export const phoneSchema = z
  .string({
    required_error: 'Phone number is required.',
    invalid_type_error: 'Phone number must be a string.',
  })
  .regex(
    /^\+([1-9]{1,4})\d{7,14}$/,
    'Please enter a valid phone number with country code.'
  );

export type PhoneData = z.infer<typeof phoneSchema>;
