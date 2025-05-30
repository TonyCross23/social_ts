import { prisma } from "../../databases/db"

interface postProps {
    postId: string, 
    userId: string
}

export const PostLikeService = {

    checkUserLike: async ({ postId, userId }: postProps) => {
        return await prisma.postLike.findFirst({
            where: {postId,userId}
        })  
    },

    createLike: async ({ postId, userId }: postProps) => {
       const like = await prisma.postLike.create({
            data: { postId, userId }
        })
        return like
    },

    unlikePost: async ({ postId, userId }: postProps) => {
        const result = await prisma.postLike.deleteMany({
            where: {
                postId: postId,
                userId: userId
            }
        });
        return result;
    },

    getAllPostLike: async (postId: string) => {
        const likes = await prisma.postLike.findMany({
            where: {postId},
            select: {
                id: true,
                postId: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
            
        })
        return likes
    }
}