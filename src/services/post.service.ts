import { get } from 'http';
import { prisma } from '../databases/db';


export const PostService = {
    createPost: async (content: string, authorId: string, image?:string) => {
        const post = await prisma.post.create({
            data: {
                content,
                authorId,
                image: image ? image : null,
            }
        });
        return post;
    },

    getAllPost: async () => {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                content: true,
                image: true,
                createdAt: true
            }
        })
        return posts
    },

    getPostById: async (id: string) => {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
             select: {
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                content: true,
                image: true,
                createdAt: true
            }
        })
        return post
    }
}