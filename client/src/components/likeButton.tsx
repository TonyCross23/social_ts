import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useState } from "react"
import API from "../services/axiosClient"

interface LikeButtonProps {
  postId: string | number;
  isLikedInitial: boolean;
  fetchPosts: () => void
}

const LikeButton = ({ postId, isLikedInitial,fetchPosts }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(isLikedInitial)

  const handleLike = async () => {
    if (isLiked) {
      await API.delete(`/feed/${postId}/unlike`)
    } else {
      await API.post(`/feed/${postId}/like`)
    }
    setIsLiked(!isLiked)
    fetchPosts()
  }

  return (
    <button onClick={handleLike} className="text-red-600">
      {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
    </button>
  )
}

export default LikeButton
