import { z } from "zod";


export const postCreateSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});
