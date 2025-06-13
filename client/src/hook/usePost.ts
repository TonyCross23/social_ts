import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/post";

export const usePosts = () => {
  return useQuery({
    queryKey: ["get","posts"],
    queryFn: fetchPosts,
  });
};
