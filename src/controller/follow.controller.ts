import { Request, Response } from "express";
import { followService } from "../services/follow.service";


export const followController = {
    createFollow: async (req: Request, res: Response) => {
        try {
            const followerId = (req as any).user?.id;
            const {followingId} = req.params;

            const result = await followService.follwUser(followerId, followingId);
            res.status(201).json({result});
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },
    unfollowUser: async (req: Request, res: Response) => {
        try {
            const followerId = (req as any).user?.id;
            const {followingId} = req.params;

             await followService.unfollowUser(followerId, followingId);
            res.status(200).json({message: "Unfollowed"});
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}