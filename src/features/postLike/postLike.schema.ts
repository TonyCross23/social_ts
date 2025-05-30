import { z } from "zod";



export const postLikeSchema = z.object({
    postId: z.string(),
})