import { Request, Response } from "express";
import { PostLikeService } from "./postLike.service";
import redis from "../../databases/redis";



export const PostLikeController = {
    createLike: async (req: Request, res: Response): Promise<void> => {
        try {
         const userId = (req as any).user?.id
         const {postId} = req.params
         
         const existingLike = await PostLikeService.checkUserLike({postId, userId})

         if(existingLike) {
            res.status(400).json({ message: "Already liked this post." });
            return;
         }

         await PostLikeService.createLike({postId,userId})
         await redis.del("all-posts");
         res.status(201).json({ message: "Liked the post" });
        } catch (err: any) {
            res.status(400).json({message: err.message})
        }
    },

    unlikePost: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as any).user?.id
            const {postId} = req.params

            await PostLikeService.unlikePost({postId, userId})
            await redis.del("all-posts");
            res.status(200).json({message: "unliked the post"})
            
        } catch (err: any) {
            res.status(400).json({message: err.message})
        }
    },

    getAllPostLike: async (req: Request, res: Response): Promise<void> => {
        try {
            const {postId} = req.params
            
            const likes = await PostLikeService.getAllPostLike(postId)

            res.status(200).json(likes)
        } catch (err: any) {
            res.status(400).json({message: err.message})
        }
    }
}