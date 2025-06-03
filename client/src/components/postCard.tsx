import dayjs from "dayjs";
import { useState, type FC } from "react";
import { FaRegCommentDots, FaShare } from "react-icons/fa";
import type { Post } from "../types/post";
import LikeButton from "./likeButton";
import { EllipsisVertical, MarsStroke, Trash, Truck } from "lucide-react";
import { useAuthStore } from "../store/auth";

interface PostProps {
  post: Post;
  fetchPosts: () => void;
}


const PostCard: FC<PostProps> = ({ post, fetchPosts }) => {
  const user = useAuthStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleOpenDropdown = () => {
  if (dropdownOpen) setDropdownOpen(false);
};
  return (
    <div
      key={post.id}
      onClick={handleOpenDropdown}
      className="max-w-2xl mx-auto mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flow-root px-3">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    post.author.image
                      ? post.author.image
                      : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  }
                  alt={post.author.name || "User image"}
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {post.createdAt ? dayjs(post.createdAt).fromNow() : ""}
                </p>
              </div>
                <div className="relative inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-gray-800 dark:text-white hover:text-blue-600"
                >
                  <EllipsisVertical className="w-5 h-5" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                 {user && post.author.id === user.id ? (
                   <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Trash className="w-4 h-4 text-red-500"/>
                    <span className="text-sm font-medium ms-1 text-red-500">Delete</span>
                  </button>
                 ) : ("")}
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MarsStroke className="w-4 h-4 "/>
                    <span className="text-sm font-medium ms-1 ">Save</span>
                  </button>
                  </div>
                )}
                </div>
            </div>
          </li>
        </ul>
      </div>
      <p className="mb-3 font-normal text-gray-700 px-2 dark:text-gray-400">
        {post.content}
      </p>
      {post.image ? (
        <img
          className="w-full"
          src={post.image}
          alt={post.content || "Post image"}
        />
      ) : (
        ""
      )}

      <div className="card-footer px-2 py-2 flex justify-around">
        <div className="flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none">
          <span className="me-2">{post.likeCount}</span>
          <LikeButton
            postId={post.id}
            isLikedInitial={post.isLiked}
            fetchPosts={fetchPosts}
          />
        </div>
        <button className="flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none">
          <span className="mt-2">0</span>
          <FaRegCommentDots className="w-5 h-5" />
        </button>
        <button className="flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none">
          <span className="mt-2">0</span>
          <FaShare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
