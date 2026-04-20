import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6, "verification code must be exactly 6 characters long")
    .regex(/^\d+$/, "verification code must contain only digits"),
});
