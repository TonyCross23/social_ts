import { Request, Response } from "express";
import { PostService } from "../services/post.service";

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
    },
    getAllPost: async (req:Request, res:Response) => {
        try {
            const posts = await PostService.getAllPost()
                const formattedPosts = posts.map(({ author, ...rest }) => ({
                    name: author.name,
                    ...rest,
                }));

            res.status(200).json(formattedPosts)
        } catch (err: any) {
            res.status(400).json({message: err.message})
        }
    },
    getPostById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const post = await PostService.getPostById(id);
            if (!post) {
              res.status(404).json({ message: "Post not found" });
              return
            }
            const { author, ...rest } = post;
            const formattedPost = {
            name: author.name,
            ...rest,
            };
             res.status(200).json(formattedPost);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    postEdit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content, image } = req.body;
            const authorId = (req as any).user?.id;
            const post = await PostService.postEdit(id, content, authorId, image);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}