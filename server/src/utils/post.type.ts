
export interface PostType {
    id: string;
    content: string;
    image: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const posts: PostType[] = [];