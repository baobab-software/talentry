import { z } from "zod";
import {
  InvitationTypeSchema,
  InvitationStatusSchema,
  AdminTypeSchema,
} from "./enums.schema";
import { IdSchema, DateSchema, JsonSchema } from "./base.schema";

export const InvitationSchema = z.object({
  id: IdSchema,
  type: InvitationTypeSchema,
  status: InvitationStatusSchema,

  companyId: IdSchema.nullable().optional(),
  adminType: AdminTypeSchema.nullable().optional(),
  adminCompanyId: IdSchema.nullable().optional(),

  inviterId: IdSchema,
  inviteeId: IdSchema.nullable().optional(),

  email: z.string({ required_error: "Email is required" }).email({ message: "Please provide a valid email address" }),
  firstName: z.string().max(100, { message: "First name must be 100 characters or less" }).nullable().optional(),
  lastName: z.string().max(100, { message: "Last name must be 100 characters or less" }).nullable().optional(),

  role: z.string().max(50, { message: "Role must be 50 characters or less" }).nullable().optional(),
  department: z.string().max(100, { message: "Department name must be 100 characters or less" }).nullable().optional(),
  title: z.string().max(100, { message: "Job title must be 100 characters or less" }).nullable().optional(),
  permissions: JsonSchema.optional(),

  token: z.string({ required_error: "Invitation token is required" }).min(1, { message: "Invitation token is required" }),
  expiresAt: DateSchema,

  acceptedAt: DateSchema.nullable().optional(),
  declinedAt: DateSchema.nullable().optional(),
  revokedAt: DateSchema.nullable().optional(),

  metadata: JsonSchema.optional(),

  createdAt: DateSchema,
  updatedAt: DateSchema,
});

// Create schema for creating new invitations (omit auto-generated fields)
export const CreateInvitationSchema = InvitationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating invitations (make all fields optional except those required)
export const UpdateInvitationSchema = InvitationSchema.omit({
  id: true,
  inviterId: true,
  token: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Export types
export type Invitation = z.infer<typeof InvitationSchema>;
export type CreateInvitation = z.infer<typeof CreateInvitationSchema>;
export type UpdateInvitation = z.infer<typeof UpdateInvitationSchema>;
