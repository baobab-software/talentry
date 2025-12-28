import { z } from "zod";
import { LoginSchema, type Login } from "../../schemas/auth/login.schema";

/**
 * Validates login data
 * @param data - The login data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateLogin = (data: Login) => {
  return LoginSchema.safeParse(data);
};

/**
 * Validates and parses login data, throwing an error if invalid
 * @param data - The login data to validate
 * @returns Parsed login data
 * @throws ZodError if validation fails
 */
export const parseLogin = (data: unknown): Login => {
  return LoginSchema.parse(data);
};

/**
 * Type guard to check if data is valid login data
 * @param data - The data to check
 * @returns True if data is valid login data
 */
export const isValidLogin = (data: unknown): data is Login => {
  return LoginSchema.safeParse(data).success;
};