import { z } from "zod";


export const forgotPasswordSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  token: z.string({
    required_error: "New Password is required"
  }),
  newPassword: z.string().min(6),
});