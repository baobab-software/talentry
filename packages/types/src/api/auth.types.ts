import { Role } from "./user.types";

/**
 * JWT Token Types
 */
export type JwtType =
  | "account_verification"
  | "access"
  | "refresh"
  | "password_setup"
  | "password_reset";

/**
 * JWT Payload Interface
 */
export interface IJWTPayload {
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
export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login Request
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Register Request Base
 */
export interface IRegisterRequestBase {
  email: string;
  password: string;
}

/**
 * Admin Register Request
 */
export interface IAdminRegisterRequest extends IRegisterRequestBase {
  firstName: string;
  lastName: string;
}

/**
 * Candidate Register Request
 */
export interface ICandidateRegisterRequest extends IRegisterRequestBase {
  firstName: string;
  lastName: string;
  phone?: string;
}

/**
 * Employer Register Request
 */
export interface IEmployerRegisterRequest extends IRegisterRequestBase {
  companyName: string;
  companyWebsite?: string;
}
