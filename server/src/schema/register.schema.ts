import { z } from "zod";



export const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email"),
    password: z.string({
        required_error: "Password is required"
    }).min(8, "Password should be 8 or more"),
    passwordConfirmation: z.string({
      required_error: "passwordConfirmation is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
