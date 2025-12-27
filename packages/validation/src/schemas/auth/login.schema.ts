import { z } from "zod";

/**
 * Schema for user login
 */
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type Login = z.infer<typeof LoginSchema>;
