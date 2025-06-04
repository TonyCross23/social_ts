import { useQuery } from "@tanstack/react-query";
import API from "../../services/axiosClient";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostCard from "../../components/postCard";
import type { Post } from "../../types/post";
import Loading from "../../components/loading";

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
    queryKey: ["get","posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="flex items-center justify-center"><Loading/></div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
    {posts && posts.length > 0 ? (
      posts.map((post: Post) => (
        <PostCard key={post.id} post={post} fetchPosts={refetch} />
      ))
    ) : (
      <div className="text-center text-gray-500 mt-96">No posts found.</div>
    )}
    </>
  );
};

export default Home;
