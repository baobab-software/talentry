import type { ZodSchema } from 'zod';

/**
 * Validation result type
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Array<{ path: string; message: string }> };

/**
 * Generic validator function that wraps Zod schema validation
 * Provides a consistent interface for validation across the application
 */
export function createValidator<T>(schema: ZodSchema<T>) {
  return (data: unknown): ValidationResult<T> => {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      errors: result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    };
  };
}

/**
 * Async validator function for async validation scenarios
 */
export async function createAsyncValidator<T>(schema: ZodSchema<T>) {
  return async (data: unknown): Promise<ValidationResult<T>> => {
    const result = await schema.safeParseAsync(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      errors: result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    };
  };
}

/**
 * Express middleware helper for validation
 * Returns errors in a format compatible with existing API error handling
 */
export function validateOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
