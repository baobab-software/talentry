import { z } from "zod";
import {
  ResetPasswordSchema,
  type ResetPassword,
} from "../../schemas/auth/reset-password.schema";

/**
 * Validates reset password request data
 * @param data - The reset password data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateResetPassword = (data: unknown) => {
  return ResetPasswordSchema.safeParse(data);
};

/**
 * Validates and parses reset password data, throwing an error if invalid
 * @param data - The reset password data to validate
 * @returns Parsed reset password data
 * @throws ZodError if validation fails
 */
export const parseResetPassword = (data: unknown): ResetPassword => {
  return ResetPasswordSchema.parse(data);
};

/**
 * Type guard to check if data is valid reset password data
 * @param data - The data to check
 * @returns True if data is valid reset password data
 */
export const isValidResetPassword = (data: unknown): data is ResetPassword => {
  return ResetPasswordSchema.safeParse(data).success;
};