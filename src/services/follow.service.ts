import redis from "../databases/redis";
import { prisma } from "../databases/db";


export const followService = {
    follwUser: async (followerId: string, followingId: string) => {
        if (followerId === followingId) {
            throw new Error("You cannot follow yourself");
        }

        const exists = await prisma.follow.findFirst({
          where: { followerId, followingId },
        });

        if (exists) {
          throw new Error("Already following this user");
        }

        return await prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
            select: {
                id: true,
                follower: {
                    select: {
                        name: true
                    }
                },
                following: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
            }
        });
    },

    unfollowUser: async (followerId: string, followingId: string) => {
        return await prisma.follow.deleteMany({
            where: {
                followerId,
                followingId
            }
        })
    },

    getFollowers: async (userId: string) => {
        const cacheFollowers = await redis.get("user's-followers")

        if(cacheFollowers) {
            return JSON.parse(cacheFollowers);
        }
        const followers = await prisma.follow.findMany({
            where: {
                followingId: userId
            },
           select: {
               id: true,
               follower: {
                   select: {
                       id: true,
                       name: true,
                       email: true,
                   }
               },
               createdAt: true,
           }
        })

         await redis.set("user's-followerss", JSON.stringify(followers), "EX", 60);
        return followers;
    }
}
