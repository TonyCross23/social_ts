import API from "../services/axiosClient";
import type { Post } from "../types/post";


export const fetchPosts = async (): Promise<Post[]> => {
  const res = await API.get("/post/feed");
  return res.data;
};