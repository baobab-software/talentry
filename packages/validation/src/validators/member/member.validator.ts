import { z } from "zod";
import {
  MemberSchema,
  CreateMemberSchema,
  UpdateMemberSchema,
  type Member,
  type CreateMember,
  type UpdateMember,
} from "../../schemas/member.schema";

/**
 * Validates member data
 * @param data - The member data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateMember = (data: unknown) => {
  return MemberSchema.safeParse(data);
};

/**
 * Validates create member data
 * @param data - The create member data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateMember = (data: unknown) => {
  return CreateMemberSchema.safeParse(data);
};

/**
 * Validates update member data
 * @param data - The update member data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateMember = (data: unknown) => {
  return UpdateMemberSchema.safeParse(data);
};

/**
 * Validates and parses member data, throwing an error if invalid
 * @param data - The member data to validate
 * @returns Parsed member data
 * @throws ZodError if validation fails
 */
export const parseMember = (data: unknown): Member => {
  return MemberSchema.parse(data);
};

/**
 * Validates and parses create member data, throwing an error if invalid
 * @param data - The create member data to validate
 * @returns Parsed create member data
 * @throws ZodError if validation fails
 */
export const parseCreateMember = (data: unknown): CreateMember => {
  return CreateMemberSchema.parse(data);
};

/**
 * Validates and parses update member data, throwing an error if invalid
 * @param data - The update member data to validate
 * @returns Parsed update member data
 * @throws ZodError if validation fails
 */
export const parseUpdateMember = (data: unknown): UpdateMember => {
  return UpdateMemberSchema.parse(data);
};

/**
 * Type guard to check if data is valid member data
 * @param data - The data to check
 * @returns True if data is valid member data
 */
export const isValidMember = (data: unknown): data is Member => {
  return MemberSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create member data
 * @param data - The data to check
 * @returns True if data is valid create member data
 */
export const isValidCreateMember = (data: unknown): data is CreateMember => {
  return CreateMemberSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update member data
 * @param data - The data to check
 * @returns True if data is valid update member data
 */
export const isValidUpdateMember = (data: unknown): data is UpdateMember => {
  return UpdateMemberSchema.safeParse(data).success;
};