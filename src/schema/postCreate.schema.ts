import { z } from "zod";


export const postCreateSchema = z.object({
    content: z.string({
        required_error: "Content is required",
    }),
})