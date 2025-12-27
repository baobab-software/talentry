import { z } from "zod";
import { AdminTypeSchema } from "./enums.schema";
import { IdSchema, DateSchema, JsonSchema } from "./base.schema";

// Base schema without refinements
const BaseAdminSchema = z.object({
  id: IdSchema.describe("Admin database ID"),

  userId: IdSchema.describe("Associated user account ID"),

  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or less"),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(1, "Last name is required")
    .max(100, "Last name must be 100 characters or less"),

  type: AdminTypeSchema.describe("Admin type/role classification"),

  invitedById: IdSchema.nullable()
    .optional()
    .describe("ID of admin who invited this user, if applicable"),

  invitedAt: DateSchema.nullable()
    .optional()
    .describe("Timestamp when invitation was accepted"),

  permissions: JsonSchema.optional().describe(
    "JSON object containing admin permissions and settings"
  ),

  createdAt: DateSchema.describe("Timestamp when admin record was created"),

  updatedAt: DateSchema.describe(
    "Timestamp when admin record was last updated"
  ),
});

// Full admin schema with refinements
export const AdminSchema = BaseAdminSchema.describe(
  "Administrator user profile schema"
).refine((data) => !data.invitedById || data.invitedAt, {
  message: "Both invitedById and invitedAt must be provided together",
  path: ["invitedAt"],
});

// Create admin schema
export const CreateAdminSchema = BaseAdminSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
  .describe("Schema for creating a new admin")
  .refine((data) => !data.invitedById || data.invitedAt, {
    message: "Both invitedById and invitedAt must be provided together",
    path: ["invitedAt"],
  });

// Update admin schema
export const UpdateAdminSchema = BaseAdminSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})
  .partial()
  .describe("Schema for updating an existing admin")
  .refine((data) => !data.invitedById || data.invitedAt, {
    message: "Both invitedById and invitedAt must be provided together",
    path: ["invitedAt"],
  });

// Export types
export type Admin = z.infer<typeof AdminSchema>;
export type CreateAdmin = z.infer<typeof CreateAdminSchema>;
export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;
