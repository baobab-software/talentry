import { TokenSchema, type Token } from "../../schemas/auth/token.schema";

/**
 * Validates token data
 * @param data - The token data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateToken = (data: unknown) => {
  return TokenSchema.safeParse(data);
};

/**
 * Validates and parses token data, throwing an error if invalid
 * @param data - The token data to validate
 * @returns Parsed token data
 * @throws ZodError if validation fails
 */
export const parseToken = (data: unknown): Token => {
  return TokenSchema.parse(data);
};

/**
 * Type guard to check if data is valid token data
 * @param data - The data to check
 * @returns True if data is valid token data
 */
export const isValidToken = (data: unknown): data is Token => {
  return TokenSchema.safeParse(data).success;
};
