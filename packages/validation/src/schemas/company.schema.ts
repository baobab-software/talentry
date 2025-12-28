import { z } from "zod";
import { IdSchema, DateSchema } from "./base.schema";

export const CompanySchema = z.object({
  id: IdSchema,
  userId: IdSchema,
  name: z
    .string({ required_error: "Company name is required" })
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(200, { message: "Company name must be 200 characters or less" }),
  description: z
    .string()
    .max(1000, { message: "Description must be 1000 characters or less" })
    .nullable()
    .optional(),
  website: z
    .string()
    .url({ message: "Please provide a valid website URL" })
    .nullable()
    .optional(),
  logo: z.string().nullable().optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

// Create schema for creating new companies (omit auto-generated fields)
export const CreateCompanySchema = CompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating companies (make all fields optional except those required)
export const UpdateCompanySchema = CompanySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Export types
export type Company = z.infer<typeof CompanySchema>;
export type CreateCompany = z.infer<typeof CreateCompanySchema>;
export type UpdateCompany = z.infer<typeof UpdateCompanySchema>;
