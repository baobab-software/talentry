import { StatusCodes } from "http-status-codes";
import { ServiceError } from "@/errors";
import { logger } from "@/libs";

/**
 * Base service class providing shared utilities for all services.
 */
export class BaseService {
  /**
   * Handles unexpected service errors with contextual tracing.
   * @template T - Return type of the wrapped function.
   * @param fn - The asynchronous function to wrap.
   * @param method - Name of the service method (used for trace context).
   * @returns The result of the function or throws a standardized ServiceError.
   */
  protected async handleErrors<T>(
    fn: () => Promise<T>,
    method: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      // Log the actual error for debugging
      if (error instanceof ServiceError) {
        logger.error(`[${method}] Service error:`, {
          message: error.message,
          statusCode: error.statusCode,
        });
        throw error;
      }

      // Log unexpected errors with full stack trace
      logger.error(`[${method}] Unexpected error: ${error.message}`, error);

      throw new ServiceError(StatusCodes.INTERNAL_SERVER_ERROR, {
        message: "An unexpected error occurred.",
        trace: {
          method,
          context: {
            originalError: error.message,
            stack: error.stack,
          },
        },
      });
    }
  }
}
