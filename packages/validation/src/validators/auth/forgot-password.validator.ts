import { z } from "zod";
import {
  ForgotPasswordSchema,
  type ForgotPassword,
} from "../../schemas/auth/forgot-password.schema";

/**
 * Validates forgot password request data
 * @param data - The forgot password data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateForgotPassword = (data: unknown) => {
  return ForgotPasswordSchema.safeParse(data);
};

/**
 * Validates and parses forgot password data, throwing an error if invalid
 * @param data - The forgot password data to validate
 * @returns Parsed forgot password data
 * @throws ZodError if validation fails
 */
export const parseForgotPassword = (data: unknown): ForgotPassword => {
  return ForgotPasswordSchema.parse(data);
};

/**
 * Type guard to check if data is valid forgot password data
 * @param data - The data to check
 * @returns True if data is valid forgot password data
 */
export const isValidForgotPassword = (data: unknown): data is ForgotPassword => {
  return ForgotPasswordSchema.safeParse(data).success;
};