import { useQuery } from "@tanstack/react-query";
import API from "../../services/axiosClient";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostCard from "../../components/postCard";
import type { Post } from "../../types/post";

dayjs.extend(relativeTime);

// API call function
const fetchPosts = async (): Promise<Post[]> => {
  const res = await API.get("/post/feed");
  return res.data;
};

const Home = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} fetchPosts={refetch} />
      ))}
    </div>
  );
};

export default Home;
