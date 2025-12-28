import { z } from "zod";
import {
  AdminSchema,
  CreateAdminSchema,
  UpdateAdminSchema,
  type Admin,
  type CreateAdmin,
  type UpdateAdmin,
} from "../../schemas/admin.schema";

/**
 * Validates admin data
 * @param data - The admin data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateAdmin = (data: unknown) => {
  return AdminSchema.safeParse(data);
};

/**
 * Validates create admin data
 * @param data - The create admin data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateAdmin = (data: unknown) => {
  return CreateAdminSchema.safeParse(data);
};

/**
 * Validates update admin data
 * @param data - The update admin data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateAdmin = (data: unknown) => {
  return UpdateAdminSchema.safeParse(data);
};

/**
 * Validates and parses admin data, throwing an error if invalid
 * @param data - The admin data to validate
 * @returns Parsed admin data
 * @throws ZodError if validation fails
 */
export const parseAdmin = (data: unknown): Admin => {
  return AdminSchema.parse(data);
};

/**
 * Validates and parses create admin data, throwing an error if invalid
 * @param data - The create admin data to validate
 * @returns Parsed create admin data
 * @throws ZodError if validation fails
 */
export const parseCreateAdmin = (data: unknown): CreateAdmin => {
  return CreateAdminSchema.parse(data);
};

/**
 * Validates and parses update admin data, throwing an error if invalid
 * @param data - The update admin data to validate
 * @returns Parsed update admin data
 * @throws ZodError if validation fails
 */
export const parseUpdateAdmin = (data: unknown): UpdateAdmin => {
  return UpdateAdminSchema.parse(data);
};

/**
 * Type guard to check if data is valid admin data
 * @param data - The data to check
 * @returns True if data is valid admin data
 */
export const isValidAdmin = (data: unknown): data is Admin => {
  return AdminSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create admin data
 * @param data - The data to check
 * @returns True if data is valid create admin data
 */
export const isValidCreateAdmin = (data: unknown): data is CreateAdmin => {
  return CreateAdminSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update admin data
 * @param data - The data to check
 * @returns True if data is valid update admin data
 */
export const isValidUpdateAdmin = (data: unknown): data is UpdateAdmin => {
  return UpdateAdminSchema.safeParse(data).success;
};