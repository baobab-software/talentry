import { z } from "zod";

export const IdSchema = z.string().cuid({ message: "Invalid ID format" });

export const DateSchema = z.coerce.date();

export const JsonSchema: z.ZodType<unknown> = z.any();
