export interface Post {
  isLiked: boolean
  id: string
  content: string
  image?: string
  createdAt: string
  author: {
    id: string,
    name: string
    image: string | null
  }
  likeCount: number
}
