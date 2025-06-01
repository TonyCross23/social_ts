import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email"),
    password: z.string().min(1, "Password required"),
})

export const registerSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().min(1,"Email is required").email("Invalid email"),
    password: z.string().min(8, "Password should be 8 or more"),
    passwordConfirmation: z.string().min(1,"passwordConfirmation is required"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
})


export type FormData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;