import { z } from "zod";
import { UserRoleSchema } from "../enums.schema";

// Base register object schema (without refinement)
const BaseRegisterSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number is required" }),
  role: UserRoleSchema.optional(),
});

// Password match refinement
const passwordMatchRefinement = <T extends { password: string; confirmPassword: string }>(
  schema: z.ZodType<T>
) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Main register schema with refinement
export const RegisterSchema = passwordMatchRefinement(BaseRegisterSchema);

// Person fields for admin and seeker
const PersonFields = {
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be 100 characters or less" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name must be 100 characters or less" }),
};

// Admin register schema
export const AdminRegisterSchema = passwordMatchRefinement(
  BaseRegisterSchema.extend(PersonFields)
);

// Seeker register schema
export const SeekerRegisterSchema = passwordMatchRefinement(
  BaseRegisterSchema.extend(PersonFields)
);

// Company register schema
export const CompanyRegisterSchema = passwordMatchRefinement(
  BaseRegisterSchema.extend({
    companyName: z
      .string({ required_error: "Company name is required" })
      .min(2, { message: "Company name must be at least 2 characters" })
      .max(200, { message: "Company name must be 200 characters or less" }),
    companyDescription: z
      .string()
      .max(1000, { message: "Description must be 1000 characters or less" })
      .nullable()
      .optional(),
    companyWebsite: z
      .string()
      .url({ message: "Please provide a valid website URL" })
      .nullable()
      .optional(),
  })
);

// Export types
export type Register = z.infer<typeof RegisterSchema>;
export type AdminRegister = z.infer<typeof AdminRegisterSchema>;
export type SeekerRegister = z.infer<typeof SeekerRegisterSchema>;
export type CompanyRegister = z.infer<typeof CompanyRegisterSchema>;
