import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "username must be at least 3 characters long")
  .max(20, "username must be at most 20 characters long")
  .regex(/^[a-zA-Z0-9_.]+$/, "email syntax should be valid");
export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email("email syntax should be valid"), // regex validation isn't necessary here because zod's email method already validates the email format
  password: z
    .string()
    .min(6, "password must be at least 6 characters long")
    .max(100, "password must be at most 100 characters long"),
});
