import { z } from "zod";
import {
  InvitationSchema,
  CreateInvitationSchema,
  UpdateInvitationSchema,
  type Invitation,
  type CreateInvitation,
  type UpdateInvitation,
} from "../../schemas/invitation.schema";

/**
 * Validates invitation data
 * @param data - The invitation data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateInvitation = (data: unknown) => {
  return InvitationSchema.safeParse(data);
};

/**
 * Validates create invitation data
 * @param data - The create invitation data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateInvitation = (data: unknown) => {
  return CreateInvitationSchema.safeParse(data);
};

/**
 * Validates update invitation data
 * @param data - The update invitation data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateInvitation = (data: unknown) => {
  return UpdateInvitationSchema.safeParse(data);
};

/**
 * Validates and parses invitation data, throwing an error if invalid
 * @param data - The invitation data to validate
 * @returns Parsed invitation data
 * @throws ZodError if validation fails
 */
export const parseInvitation = (data: unknown): Invitation => {
  return InvitationSchema.parse(data);
};

/**
 * Validates and parses create invitation data, throwing an error if invalid
 * @param data - The create invitation data to validate
 * @returns Parsed create invitation data
 * @throws ZodError if validation fails
 */
export const parseCreateInvitation = (data: unknown): CreateInvitation => {
  return CreateInvitationSchema.parse(data);
};

/**
 * Validates and parses update invitation data, throwing an error if invalid
 * @param data - The update invitation data to validate
 * @returns Parsed update invitation data
 * @throws ZodError if validation fails
 */
export const parseUpdateInvitation = (data: unknown): UpdateInvitation => {
  return UpdateInvitationSchema.parse(data);
};

/**
 * Type guard to check if data is valid invitation data
 * @param data - The data to check
 * @returns True if data is valid invitation data
 */
export const isValidInvitation = (data: unknown): data is Invitation => {
  return InvitationSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create invitation data
 * @param data - The data to check
 * @returns True if data is valid create invitation data
 */
export const isValidCreateInvitation = (data: unknown): data is CreateInvitation => {
  return CreateInvitationSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update invitation data
 * @param data - The data to check
 * @returns True if data is valid update invitation data
 */
export const isValidUpdateInvitation = (data: unknown): data is UpdateInvitation => {
  return UpdateInvitationSchema.safeParse(data).success;
};