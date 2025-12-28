import { z } from "zod";
import { IdSchema, DateSchema } from "./base.schema";

export const SeekerSchema = z.object({
  id: IdSchema,
  userId: IdSchema,
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be 100 characters or less" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name must be 100 characters or less" }),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

// Create schema for creating new seekers (omit auto-generated fields)
export const CreateSeekerSchema = SeekerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating seekers (make all fields optional except those required)
export const UpdateSeekerSchema = SeekerSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Export types
export type Seeker = z.infer<typeof SeekerSchema>;
export type CreateSeeker = z.infer<typeof CreateSeekerSchema>;
export type UpdateSeeker = z.infer<typeof UpdateSeekerSchema>;
