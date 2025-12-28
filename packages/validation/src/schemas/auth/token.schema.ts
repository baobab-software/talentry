import { z } from "zod";

export const TokenSchema = z.object({
  token: z
    .string({ required_error: "Token is required" })
    .min(1, { message: "Token is required" }),
});

export type Token = z.infer<typeof TokenSchema>;