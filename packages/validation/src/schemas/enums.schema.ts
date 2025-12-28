import { z } from "zod";

export const UserRoleSchema = z.enum([
  "ADMIN",
  "SEEKER",
  "EMPLOYER",
]);

export const AdminTypeSchema = z.enum([
  "SUPER_ADMIN",
  "COMPANY_ADMIN",
]);

export const CompanyMemberRoleSchema = z.enum([
  "OWNER",
  "ADMIN",
  "MANAGER",
  "MEMBER",
  "VIEWER",
]);

export const CompanyMemberStatusSchema = z.enum([
  "ACTIVE",
  "SUSPENDED",
  "INACTIVE",
]);

export const InvitationTypeSchema = z.enum([
  "COMPANY_MEMBER",
  "ADMIN_USER",
]);

export const InvitationStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
  "EXPIRED",
  "CANCELLED",
  "REVOKED",
]);

export const JoinRequestStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "WITHDRAWN",
]);
