import cloudinary from '../utils/cloudinary';
import { prisma } from '../databases/db';
import redis from '../databases/redis';

const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  return `${folder}/${fileName.split('.')[0]}`;
};

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

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

    getAllPost: async (userId?: string) => {
        const cachedPosts = await redis.get("all-posts");

          if (cachedPosts) {
            return JSON.parse(cachedPosts);
          }

          const posts = await prisma.post.findMany({
            select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
            author: {
                select: {
                name: true,
                image: true,
                },
            },
            postLikes: {
                select: {
                id: true,
                userId: true
                },
            },
            },
            orderBy: {
            createdAt: "desc",
            },
        })

        // Add likeCount property to each post
  const formattedPosts = posts.map((post) => {
    const likeCount = post.postLikes.length;
    const isLiked = userId ? post.postLikes.some((like) => like.userId === userId) : false;

    return {
      ...post,
      likeCount,
      isLiked
    };
  });

         await redis.set("all-posts", JSON.stringify(formattedPosts), "EX", 60);
         return formattedPosts
    },

    getPostFollowing: async (userId: string) => {
        const follow = await prisma.follow.findMany({
            where: {
                followerId: userId,
            }
        })
        
        const users = follow.map((item) => item.followingId)

        const posts = await prisma.post.findMany({
            where: {
                authorId: {
                    in: users
                },
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
        return posts;
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
    },

    postEdit: async (id: string, content: string, authorId: string, image?:string) => {

        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        if(!post) {
          throw new Error("Post not found");
        }

        if(image || post.image) {
            const publicId = getPublicIdFromUrl(post.image);
            await deleteImage(publicId);
        }

        const updatePost = await prisma.post.update({
            where: {
                id
            },
            data: {
                content,
                authorId,
                image: image ||  post.image,
            }
        });
        return updatePost;
    },

    postDelete: async (id: string) => {

        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });

        if(!post) {
          throw new Error("Post not found");
        }

        if(post.image) {
            const publicId = getPublicIdFromUrl(post.image);
            await deleteImage(publicId);
        }
            await prisma.post.delete({
            where: {
                id
            }
        });
        return post;
    }
}