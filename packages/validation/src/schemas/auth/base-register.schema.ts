import { z } from 'zod';
import { emailSchema } from '../shared/email.schema';
import { phoneSchema } from '../shared/phone.schema';
import { passwordSchema } from '../shared/password.schema';

/**
 * Base registration schema containing common fields
 * for all user registration types
 */
export const baseRegisterSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export type BaseRegisterData = z.infer<typeof baseRegisterSchema>;
