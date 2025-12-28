import { z } from "zod";
import {
  CompanySchema,
  CreateCompanySchema,
  UpdateCompanySchema,
  type Company,
  type CreateCompany,
  type UpdateCompany,
} from "../../schemas/company.schema";

/**
 * Validates company data
 * @param data - The company data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCompany = (data: unknown) => {
  return CompanySchema.safeParse(data);
};

/**
 * Validates create company data
 * @param data - The create company data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateCompany = (data: unknown) => {
  return CreateCompanySchema.safeParse(data);
};

/**
 * Validates update company data
 * @param data - The update company data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateCompany = (data: unknown) => {
  return UpdateCompanySchema.safeParse(data);
};

/**
 * Validates and parses company data, throwing an error if invalid
 * @param data - The company data to validate
 * @returns Parsed company data
 * @throws ZodError if validation fails
 */
export const parseCompany = (data: unknown): Company => {
  return CompanySchema.parse(data);
};

/**
 * Validates and parses create company data, throwing an error if invalid
 * @param data - The create company data to validate
 * @returns Parsed create company data
 * @throws ZodError if validation fails
 */
export const parseCreateCompany = (data: unknown): CreateCompany => {
  return CreateCompanySchema.parse(data);
};

/**
 * Validates and parses update company data, throwing an error if invalid
 * @param data - The update company data to validate
 * @returns Parsed update company data
 * @throws ZodError if validation fails
 */
export const parseUpdateCompany = (data: unknown): UpdateCompany => {
  return UpdateCompanySchema.parse(data);
};

/**
 * Type guard to check if data is valid company data
 * @param data - The data to check
 * @returns True if data is valid company data
 */
export const isValidCompany = (data: unknown): data is Company => {
  return CompanySchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create company data
 * @param data - The data to check
 * @returns True if data is valid create company data
 */
export const isValidCreateCompany = (data: unknown): data is CreateCompany => {
  return CreateCompanySchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update company data
 * @param data - The data to check
 * @returns True if data is valid update company data
 */
export const isValidUpdateCompany = (data: unknown): data is UpdateCompany => {
  return UpdateCompanySchema.safeParse(data).success;
};