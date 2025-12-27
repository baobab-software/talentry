import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
