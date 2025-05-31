import { z } from "zod";


export const followerCreateSchema = z.object({
    followingId: z.string().uuid({message: "Invalid following ID"}),
})