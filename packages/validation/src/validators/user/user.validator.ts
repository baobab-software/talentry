import { z } from "zod";
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  type User,
  type CreateUser,
  type UpdateUser,
} from "../../schemas/user.schema";

/**
 * Validates user data
 * @param data - The user data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};

/**
 * Validates create user data
 * @param data - The create user data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateCreateUser = (data: unknown) => {
  return CreateUserSchema.safeParse(data);
};

/**
 * Validates update user data
 * @param data - The update user data to validate
 * @returns Validation result with parsed data or errors
 */
export const validateUpdateUser = (data: unknown) => {
  return UpdateUserSchema.safeParse(data);
};

/**
 * Validates and parses user data, throwing an error if invalid
 * @param data - The user data to validate
 * @returns Parsed user data
 * @throws ZodError if validation fails
 */
export const parseUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

/**
 * Validates and parses create user data, throwing an error if invalid
 * @param data - The create user data to validate
 * @returns Parsed create user data
 * @throws ZodError if validation fails
 */
export const parseCreateUser = (data: unknown): CreateUser => {
  return CreateUserSchema.parse(data);
};

/**
 * Validates and parses update user data, throwing an error if invalid
 * @param data - The update user data to validate
 * @returns Parsed update user data
 * @throws ZodError if validation fails
 */
export const parseUpdateUser = (data: unknown): UpdateUser => {
  return UpdateUserSchema.parse(data);
};

/**
 * Type guard to check if data is valid user data
 * @param data - The data to check
 * @returns True if data is valid user data
 */
export const isValidUser = (data: unknown): data is User => {
  return UserSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid create user data
 * @param data - The data to check
 * @returns True if data is valid create user data
 */
export const isValidCreateUser = (data: unknown): data is CreateUser => {
  return CreateUserSchema.safeParse(data).success;
};

/**
 * Type guard to check if data is valid update user data
 * @param data - The data to check
 * @returns True if data is valid update user data
 */
export const isValidUpdateUser = (data: unknown): data is UpdateUser => {
  return UpdateUserSchema.safeParse(data).success;
};