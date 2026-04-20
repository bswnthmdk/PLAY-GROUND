import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().email("email syntax should be valid"), // regex validation  isn't required due to the zod's email method
  password: z.string().min(6, "password must be at least 6 characters long"),
});
