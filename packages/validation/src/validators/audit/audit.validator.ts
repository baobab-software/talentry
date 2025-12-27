import { z } from "zod";
import {
  CompanyMemberAuditSchema,
  CreateCompanyMemberAuditSchema,
  type CompanyMemberAudit,
  type CreateCompanyMemberAudit,
} from "../../schemas/audit.schema";

/**
 * Validates company member audit data
 * @param data - The company member audit data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCompanyMemberAudit = (data: unknown) => {
  return CompanyMemberAuditSchema.safeParse(data);
};

/**
 * Validates create company member audit data
 * @param data - The create company member audit data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateCompanyMemberAudit = (data: unknown) => {
  return CreateCompanyMemberAuditSchema.safeParse(data);
};

/**
 * Validates and parses company member audit data, throwing an error if invalid
 * @param data - The company member audit data to validate
 * @returns Parsed company member audit data
 * @throws ZodError if validation fails
 */
export const parseCompanyMemberAudit = (data: unknown): CompanyMemberAudit => {
  return CompanyMemberAuditSchema.parse(data);
};

/**
 * Validates and parses create company member audit data, throwing an error if invalid
 * @param data - The create company member audit data to validate
 * @returns Parsed create company member audit data
 * @throws ZodError if validation fails
 */
export const parseCreateCompanyMemberAudit = (data: unknown): CreateCompanyMemberAudit => {
  return CreateCompanyMemberAuditSchema.parse(data);
};

/**
 * Type guard to check if data is valid company member audit data
 * @param data - The data to check
 * @returns True if data is valid company member audit data
 */
export const isValidCompanyMemberAudit = (data: unknown): data is CompanyMemberAudit => {
  return CompanyMemberAuditSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create company member audit data
 * @param data - The data to check
 * @returns True if data is valid create company member audit data
 */
export const isValidCreateCompanyMemberAudit = (data: unknown): data is CreateCompanyMemberAudit => {
  return CreateCompanyMemberAuditSchema.safeParse(data).success;
};