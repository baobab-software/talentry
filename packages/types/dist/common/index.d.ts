/**
 * HTTP Status Codes
 */
declare enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}
/**
 * Environment Types
 */
declare enum Environment {
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
    TEST = "test"
}
/**
 * Sort Order
 */
declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
/**
 * Common Query Filters
 */
interface ICommonFilters {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
}

export { Environment, HttpStatus, type ICommonFilters, SortOrder };
