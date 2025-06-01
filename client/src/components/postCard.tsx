import dayjs from 'dayjs'
import { type FC } from 'react'
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import type { Post } from '../types/post';
import LikeButton from './likeButton';

interface PostProps {
    post: Post
    fetchPosts: () => void
}

const PostCard: FC<PostProps> = ({post, fetchPosts}) => {
  return (
   <div
          key={post.id}
          
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
                            src={post.author.image ? post.author.image : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
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
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        |
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

            <div className='card-footer px-2 py-2 flex justify-around'>
               <div className='flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none'>
                <span className='me-2'>{post.likeCount}</span>
                <LikeButton postId={post.id} isLikedInitial={post.isLiked} fetchPosts={fetchPosts}/>
               </div>
                <button className="flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none">
                    <span className='mt-2'>{post.likeCount}</span>
                    <FaRegCommentDots className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-1 text-gray-600 ml-4 focus:outline-none">
                    <span className='mt-2'>{post.likeCount}</span>
                    <FaShare className="w-5 h-5" />
                </button>
            </div>
        </div>
  )
}

export default PostCard
