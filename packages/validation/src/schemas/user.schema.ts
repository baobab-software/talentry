import { z } from "zod";
import { UserRoleSchema } from "./enums.schema";
import { IdSchema, DateSchema } from "./base.schema";

export const UserSchema = z.object({
  id: IdSchema,
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone number is required" }),
  avatar: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  role: UserRoleSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
