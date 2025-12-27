import { z } from "zod";

/**
 * Schema for reset password request
 */
export const ResetPasswordSchema = z
  .object({
    token: z
      .string({ required_error: "Reset token is required" })
      .min(1, { message: "Reset token is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
