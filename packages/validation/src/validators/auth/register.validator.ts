import {
  RegisterSchema,
  AdminRegisterSchema,
  SeekerRegisterSchema,
  CompanyRegisterSchema,
  type Register,
} from "../../schemas/auth/register.schema";

/**
 * Validates registration data against the RegisterSchema
 * @param data - The registration data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateRegister = (data: unknown) => {
  return RegisterSchema.safeParse(data);
};

/**
 * Validates admin registration data
 * @param data - The admin registration data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateAdminRegister = (data: unknown) => {
  return AdminRegisterSchema.safeParse(data);
};

/**
 * Validates seeker registration data
 * @param data - The seeker registration data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateSeekerRegister = (data: unknown) => {
  return SeekerRegisterSchema.safeParse(data);
};

/**
 * Validates company registration data
 * @param data - The company registration data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCompanyRegister = (data: unknown) => {
  return CompanyRegisterSchema.safeParse(data);
};

/**
 * Validates and parses registration data, throwing an error if invalid
 * @param data - The registration data to validate
 * @returns Parsed registration data
 * @throws ZodError if validation fails
 */
export const parseRegister = (data: unknown): Register => {
  return RegisterSchema.parse(data);
};

/**
 * Type guard to check if data is valid registration data
 * @param data - The data to check
 * @returns True if data is valid registration data
 */
export const isValidRegister = (data: unknown): data is Register => {
  return RegisterSchema.safeParse(data).success;
};
