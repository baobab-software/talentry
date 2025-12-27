import { z } from "zod";
import {
  JoinRequestSchema,
  CreateJoinRequestSchema,
  UpdateJoinRequestSchema,
  type JoinRequest,
  type CreateJoinRequest,
  type UpdateJoinRequest,
} from "../../schemas/join-request.schema";

/**
 * Validates join request data
 * @param data - The join request data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateJoinRequest = (data: unknown) => {
  return JoinRequestSchema.safeParse(data);
};

/**
 * Validates create join request data
 * @param data - The create join request data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateJoinRequest = (data: unknown) => {
  return CreateJoinRequestSchema.safeParse(data);
};

/**
 * Validates update join request data
 * @param data - The update join request data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateJoinRequest = (data: unknown) => {
  return UpdateJoinRequestSchema.safeParse(data);
};

/**
 * Validates and parses join request data, throwing an error if invalid
 * @param data - The join request data to validate
 * @returns Parsed join request data
 * @throws ZodError if validation fails
 */
export const parseJoinRequest = (data: unknown): JoinRequest => {
  return JoinRequestSchema.parse(data);
};

/**
 * Validates and parses create join request data, throwing an error if invalid
 * @param data - The create join request data to validate
 * @returns Parsed create join request data
 * @throws ZodError if validation fails
 */
export const parseCreateJoinRequest = (data: unknown): CreateJoinRequest => {
  return CreateJoinRequestSchema.parse(data);
};

/**
 * Validates and parses update join request data, throwing an error if invalid
 * @param data - The update join request data to validate
 * @returns Parsed update join request data
 * @throws ZodError if validation fails
 */
export const parseUpdateJoinRequest = (data: unknown): UpdateJoinRequest => {
  return UpdateJoinRequestSchema.parse(data);
};

/**
 * Type guard to check if data is valid join request data
 * @param data - The data to check
 * @returns True if data is valid join request data
 */
export const isValidJoinRequest = (data: unknown): data is JoinRequest => {
  return JoinRequestSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create join request data
 * @param data - The data to check
 * @returns True if data is valid create join request data
 */
export const isValidCreateJoinRequest = (data: unknown): data is CreateJoinRequest => {
  return CreateJoinRequestSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update join request data
 * @param data - The data to check
 * @returns True if data is valid update join request data
 */
export const isValidUpdateJoinRequest = (data: unknown): data is UpdateJoinRequest => {
  return UpdateJoinRequestSchema.safeParse(data).success;
};