import { z } from "zod";
import { IdSchema, DateSchema, JsonSchema } from "./base.schema";

export const CompanyMemberAuditSchema = z.object({
  id: IdSchema,
  companyId: IdSchema.nullable().optional(),
  memberId: IdSchema.nullable().optional(),
  actorId: IdSchema,

  actionType: z.string({ required_error: "Action type is required" }).min(1, { message: "Action type is required" }).max(100, { message: "Action type must be 100 characters or less" }),
  targetType: z.string({ required_error: "Target type is required" }).min(1, { message: "Target type is required" }).max(100, { message: "Target type must be 100 characters or less" }),
  targetId: IdSchema.nullable().optional(),

  oldData: JsonSchema.optional(),
  newData: JsonSchema.optional(),
  changes: JsonSchema.optional(),

  ipAddress: z.string().ip({ message: "Please provide a valid IP address" }).nullable().optional(),
  userAgent: z.string().max(500, { message: "User agent must be 500 characters or less" }).nullable().optional(),
  metadata: JsonSchema.optional(),

  createdAt: DateSchema,
});

// Create schema for creating new audit logs (omit auto-generated fields)
export const CreateCompanyMemberAuditSchema = CompanyMemberAuditSchema.omit({
  id: true,
  createdAt: true,
});

// Export types
export type CompanyMemberAudit = z.infer<typeof CompanyMemberAuditSchema>;
export type CreateCompanyMemberAudit = z.infer<typeof CreateCompanyMemberAuditSchema>;
