/**
 * User Roles
 */
export enum Role {
  ADMIN = "admin",
  CANDIDATE = "candidate",
  EMPLOYER = "employer",
}

export { Role as UserRole };

/**
 * Base User Interface
 */
export interface IUser {
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
