import { z } from "zod";
import {
  SeekerSchema,
  CreateSeekerSchema,
  UpdateSeekerSchema,
  type Seeker,
  type CreateSeeker,
  type UpdateSeeker,
} from "../../schemas/seeker.schema";

/**
 * Validates seeker data
 * @param data - The seeker data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateSeeker = (data: unknown) => {
  return SeekerSchema.safeParse(data);
};

/**
 * Validates create seeker data
 * @param data - The create seeker data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateSeeker = (data: unknown) => {
  return CreateSeekerSchema.safeParse(data);
};

/**
 * Validates update seeker data
 * @param data - The update seeker data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateSeeker = (data: unknown) => {
  return UpdateSeekerSchema.safeParse(data);
};

/**
 * Validates and parses seeker data, throwing an error if invalid
 * @param data - The seeker data to validate
 * @returns Parsed seeker data
 * @throws ZodError if validation fails
 */
export const parseSeeker = (data: unknown): Seeker => {
  return SeekerSchema.parse(data);
};

/**
 * Validates and parses create seeker data, throwing an error if invalid
 * @param data - The create seeker data to validate
 * @returns Parsed create seeker data
 * @throws ZodError if validation fails
 */
export const parseCreateSeeker = (data: unknown): CreateSeeker => {
  return CreateSeekerSchema.parse(data);
};

/**
 * Validates and parses update seeker data, throwing an error if invalid
 * @param data - The update seeker data to validate
 * @returns Parsed update seeker data
 * @throws ZodError if validation fails
 */
export const parseUpdateSeeker = (data: unknown): UpdateSeeker => {
  return UpdateSeekerSchema.parse(data);
};

/**
 * Type guard to check if data is valid seeker data
 * @param data - The data to check
 * @returns True if data is valid seeker data
 */
export const isValidSeeker = (data: unknown): data is Seeker => {
  return SeekerSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create seeker data
 * @param data - The data to check
 * @returns True if data is valid create seeker data
 */
export const isValidCreateSeeker = (data: unknown): data is CreateSeeker => {
  return CreateSeekerSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update seeker data
 * @param data - The data to check
 * @returns True if data is valid update seeker data
 */
export const isValidUpdateSeeker = (data: unknown): data is UpdateSeeker => {
  return UpdateSeekerSchema.safeParse(data).success;
};