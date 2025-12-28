import { z } from "zod";
import {
  CompanyMemberRoleSchema,
  CompanyMemberStatusSchema,
} from "./enums.schema";
import { IdSchema, DateSchema, JsonSchema } from "./base.schema";

export const CompanyMemberSchema = z.object({
  id: IdSchema,
  companyId: IdSchema,
  userId: IdSchema,
  role: CompanyMemberRoleSchema,
  status: CompanyMemberStatusSchema,
  department: z.string().max(100, { message: "Department name must be 100 characters or less" }).nullable().optional(),
  title: z.string().max(100, { message: "Job title must be 100 characters or less" }).nullable().optional(),
  permissions: JsonSchema.optional(),
  invitedById: IdSchema.nullable().optional(),
  invitedAt: DateSchema.nullable().optional(),
  joinedAt: DateSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

// Alias for backward compatibility
export const MemberSchema = CompanyMemberSchema;

// Create schema for creating new members (omit auto-generated fields)
export const CreateMemberSchema = CompanyMemberSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating members (make all fields optional except those required)
export const UpdateMemberSchema = CompanyMemberSchema.omit({
  id: true,
  companyId: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Export types
export type CompanyMember = z.infer<typeof CompanyMemberSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type CreateMember = z.infer<typeof CreateMemberSchema>;
export type UpdateMember = z.infer<typeof UpdateMemberSchema>;
