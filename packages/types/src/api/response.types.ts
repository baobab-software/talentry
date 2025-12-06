/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  statusCode: number;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
}

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
  stack?: string;
}

/**
 * Success Response
 */
export interface SuccessResponse<T = unknown> {
  status: "success";
  statusCode: number;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Error Response
 */
export interface ErrorResponse {
  status: "error";
  statusCode: number;
  error: ApiError;
  timestamp: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Pagination Query Options
 */
export interface IPaginationQueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}
