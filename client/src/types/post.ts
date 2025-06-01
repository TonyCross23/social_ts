export interface Post {
  id: string
  author: {
    name: string
    image: string | null
  }
  content: string
  image: string
  createdAt: string
  likeCount: number
}