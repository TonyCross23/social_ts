import { Request, Response } from "express";
import { PostService } from "../services/post.service";



interface TokenPayload {
  userId: string;
}

export const PostController = {
    postCreate: async (req: Request, res: Response) => {
        try {
            const { content, image } = req.body;
            let authorId = (req as any).user?.id;
            const post = await PostService.createPost(content, authorId, image);
            res.status(201).json(post);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}