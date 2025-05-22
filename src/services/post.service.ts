import { prisma } from '../databases/db';


export const PostService = {
    createPost: async (content: string, authorId: string, image?:string) => {
        console.log(content);
        const post = await prisma.post.create({
            data: {
                content,
                authorId,
                image: image ? image : null,
            }
        });
        return post;
    }
}