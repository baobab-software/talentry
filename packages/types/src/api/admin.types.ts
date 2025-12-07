import { IUser } from "./user.types";

/**
 * Admin Permissions
 */
export type Permissions = "READ" | "WRITE" | "DELETE";
export const PERMISSIONS = ["READ", "WRITE", "DELETE"] as const;

/**
 * Admin User Interface
 */
export interface IAdmin {
  readonly id: string;
  firstName?: string;
  lastName?: string;
  permissions?: Array<Permissions>;
  userId?: string;
  user?: Partial<IUser>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
