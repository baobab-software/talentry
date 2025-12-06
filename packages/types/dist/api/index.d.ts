/**
 * User Roles
 */
declare enum Role {
    ADMIN = "admin",
    CANDIDATE = "candidate",
    EMPLOYER = "employer"
}

/**
 * Base User Interface
 */
interface IUser {
    readonly id: string;
    avatarUrl: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    isVerified: boolean;
    isActive: boolean;
    isLocked: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

/**
 * Admin Permissions
 */
type Permissions = "READ" | "WRITE" | "DELETE";
declare const PERMISSIONS: readonly ["READ", "WRITE", "DELETE"];
/**
 * Admin User Interface
 */
interface IAdmin {
    readonly id: string;
    firstName?: string;
    lastName?: string;
    permissions?: Array<Permissions>;
    userId?: string;
    user?: Partial<IUser>;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

/**
 * Standard API Response wrapper
 */
interface ApiResponse<T = unknown> {
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
interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
    stack?: string;
}
/**
 * Success Response
 */
interface SuccessResponse<T = unknown> {
    status: "success";
    statusCode: number;
    data: T;
    message?: string;
    timestamp: string;
}
/**
 * Error Response
 */
interface ErrorResponse {
    status: "error";
    statusCode: number;
    error: ApiError;
    timestamp: string;
}
/**
 * Pagination metadata
 */
interface PaginationMeta {
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
interface PaginatedResponse<T = unknown> {
    data: T[];
    pagination: PaginationMeta;
}
/**
 * Pagination Query Options
 */
interface IPaginationQueryOptions {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}

/**
 * Candidate User Interface
 */
interface ICandidate {
    readonly id?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    skills?: Array<string>;
    isEmployed?: boolean;
    userId?: string;
    user?: Partial<IUser>;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

/**
 * Employer User Interface
 */
interface IEmployer {
    readonly id?: string;
    name?: string;
    industry?: string;
    websiteUrl?: string;
    location?: string;
    description?: string;
    size?: number;
    foundedIn?: number;
    isVerified?: boolean;
    userId?: string;
    user?: Partial<IUser>;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

/**
 * JWT Token Types
 */
type JwtType = "account_verification" | "access" | "refresh" | "password_setup" | "password_reset";
/**
 * JWT Payload Interface
 */
interface IJWTPayload {
    userId: string;
    email: string;
    role: Role;
    type?: JwtType;
    iat?: number;
    exp?: number;
}
/**
 * Authentication Token Response
 */
interface IAuthTokens {
    accessToken: string;
    refreshToken: string;
}
/**
 * Login Request
 */
interface ILoginRequest {
    email: string;
    password: string;
}
/**
 * Register Request Base
 */
interface IRegisterRequestBase {
    email: string;
    password: string;
}
/**
 * Admin Register Request
 */
interface IAdminRegisterRequest extends IRegisterRequestBase {
    firstName: string;
    lastName: string;
}
/**
 * Candidate Register Request
 */
interface ICandidateRegisterRequest extends IRegisterRequestBase {
    firstName: string;
    lastName: string;
    phone?: string;
}
/**
 * Employer Register Request
 */
interface IEmployerRegisterRequest extends IRegisterRequestBase {
    companyName: string;
    companyWebsite?: string;
}

/**
 * Job Status Enum
 */
declare enum JobStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CLOSED = "closed",
    ARCHIVED = "archived"
}
/**
 * Job Type Enum
 */
declare enum JobType {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    CONTRACT = "contract",
    INTERNSHIP = "internship",
    FREELANCE = "freelance"
}
/**
 * Experience Level Enum
 */
declare enum ExperienceLevel {
    ENTRY = "entry",
    MID = "mid",
    SENIOR = "senior",
    LEAD = "lead",
    EXECUTIVE = "executive"
}
/**
 * Job Interface
 */
interface IJob {
    id: string;
    title: string;
    description: string;
    companyId: string;
    location: string;
    type: JobType;
    status: JobStatus;
    experienceLevel: ExperienceLevel;
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    skills: string[];
    requirements: string[];
    benefits?: string[];
    remote: boolean;
    applicationsCount: number;
    viewsCount: number;
    publishedAt?: Date;
    closedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Job Application Status
 */
declare enum ApplicationStatus {
    PENDING = "pending",
    REVIEWING = "reviewing",
    SHORTLISTED = "shortlisted",
    INTERVIEWED = "interviewed",
    OFFERED = "offered",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    WITHDRAWN = "withdrawn"
}
/**
 * Job Application Interface
 */
interface IJobApplication {
    id: string;
    jobId: string;
    candidateId: string;
    status: ApplicationStatus;
    coverLetter?: string;
    resume: string;
    appliedAt: Date;
    updatedAt: Date;
}

export { type ApiError, type ApiResponse, ApplicationStatus, type ErrorResponse, ExperienceLevel, type IAdmin, type IAdminRegisterRequest, type IAuthTokens, type ICandidate, type ICandidateRegisterRequest, type IEmployer, type IEmployerRegisterRequest, type IJWTPayload, type IJob, type IJobApplication, type ILoginRequest, type IPaginationQueryOptions, type IRegisterRequestBase, type IUser, JobStatus, JobType, type JwtType, PERMISSIONS, type PaginatedResponse, type PaginationMeta, type Permissions, Role, type SuccessResponse, Role as UserRole };
