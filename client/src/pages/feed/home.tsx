import { useEffect, useState } from "react";
import API from "../../services/axiosClient";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PostCard from "../../components/postCard";
import type { Post } from "../../types/post";

dayjs.extend(relativeTime)

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/post/feed");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching feed", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post}/>
      ))}
    </div>
  );
};

export default Home;
