import { z } from 'zod';

const BLOCKED_DOMAINS = ['protonmail.com', 'pront.me', 'tutanota.io'];

export const emailSchema = z
  .string({
    required_error: 'Email is required and cannot be empty.',
    invalid_type_error: 'Email must be a string.',
  })
  .trim()
  .toLowerCase()
  .min(1, 'Email cannot be just spaces or empty.')
  .max(255, 'Email cannot exceed 255 characters.')
  .email('Please enter a valid email address.')
  .refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase();
      return !BLOCKED_DOMAINS.includes(domain);
    },
    {
      message: 'We currently do not accept emails from that provider.',
    }
  );

export type EmailData = z.infer<typeof emailSchema>;
