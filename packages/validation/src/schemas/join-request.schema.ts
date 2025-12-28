import { z } from "zod";
import { JoinRequestStatusSchema } from "./enums.schema";
import { IdSchema, DateSchema } from "./base.schema";

export const JoinRequestSchema = z.object({
  id: IdSchema,
  companyId: IdSchema,
  userId: IdSchema,
  message: z.string().max(500, { message: "Message must be 500 characters or less" }).nullable().optional(),
  status: JoinRequestStatusSchema,
  reviewedById: IdSchema.nullable().optional(),
  reviewedAt: DateSchema.nullable().optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

// Create schema for creating new join requests (omit auto-generated fields)
export const CreateJoinRequestSchema = JoinRequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating join requests (make all fields optional except those required)
export const UpdateJoinRequestSchema = JoinRequestSchema.omit({
  id: true,
  companyId: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Export types
export type JoinRequest = z.infer<typeof JoinRequestSchema>;
export type CreateJoinRequest = z.infer<typeof CreateJoinRequestSchema>;
export type UpdateJoinRequest = z.infer<typeof UpdateJoinRequestSchema>;

// Legacy export for backward compatibility
export const CompanyJoinRequestSchema = JoinRequestSchema;
