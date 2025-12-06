/**
 * Type exports for Talentry validation schemas
 */

export type { EmailData } from "../schemas/shared/email.schema";
export type { PasswordData } from "../schemas/shared/password.schema";
export type { PhoneData } from "../schemas/shared/phone.schema";

export type { BaseRegisterData } from "../schemas/auth/base-register.schema";
export type { AdminRegisterData } from "../schemas/auth/admin-register.schema";
export type { CandidateRegisterData } from "../schemas/auth/candidate-register.schema";
export type { EmployerRegisterData } from "../schemas/auth/employer-register.schema";
export type { LoginData } from "../schemas/auth/login.schema";
export type { ForgotPasswordData } from "../schemas/auth/forgot-password.schema";
export type { ResetPasswordData } from "../schemas/auth/reset-password.schema";

export type { AdminUpdateData } from "../schemas/user/admin.schema";
export type { CandidateUpdateData } from "../schemas/user/candidate.schema";
export type { EmployerUpdateData } from "../schemas/user/employer.schema";

export type {
  JobCreateData,
  JobUpdateData,
  JobType,
} from "../schemas/job/job.schema";
