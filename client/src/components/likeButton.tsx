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
  const newIsLiked = !isLiked; // New state calculation
  setIsLiked(newIsLiked); // Optimistically update the UI

  try {
    // Perform API request based on new state
    if (newIsLiked) {
      await API.post(`/feed/${postId}/like`); // Like action
    } else {
      await API.delete(`/feed/${postId}/unlike`); // Unlike action
    }
    
    fetchPosts(); // Refresh posts after action
  } catch (error) {
    console.error("Error updating like status:", error);
    // Revert to the previous like state if an error occurs
    setIsLiked(isLiked); // Reset to original state
  }
}

  return (
    <button onClick={handleLike} className="text-red-600 cursor-pointer">
      {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
    </button>
  )
}

export default LikeButton
