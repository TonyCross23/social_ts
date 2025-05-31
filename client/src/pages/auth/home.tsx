import { useEffect, useState } from "react"
import API from "../../services/axiosClient"

const Home = () => {
    const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const res = await API.get("/post/feed")
      setPosts(res.data)
    } catch (err) {
      console.error("Error fetching feed", err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h1>Feed</h1>
      {posts.map((post: any) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>

  )
}

export default Home
