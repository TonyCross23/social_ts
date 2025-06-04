import { Image, Plus } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import API from "../services/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "./loading";

type Inputs = {
  content: string
  image: FileList
}

const PostCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient()

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      const res = await API.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsOpen(false);
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['get','posts'] })
        reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full p-3 bg-gray-200"
      >
        <Plus className="w-4 h-4" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 max-w-xl mt-36 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-b-gray-100">
              <h3 className="text-xl font-semibold">Create Post</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Put your post form inputs here */}
              <textarea
                className="w-full border border-gray-200 rounded p-2"
                placeholder="What's on your mind?"
                {...register("content")}
              ></textarea>
                            {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                  />
            </div>
            <div className="flex justify-between items-center p-4 border-t border-t-gray-100">
              <div className="flex items-center space-x-4">
                {/* Image Upload Icon Button */}
                <label className="cursor-pointer flex items-center">
                  <input type="file" accept="image/*" className="hidden"   {...register("image")}/>
                  <Image className="w-6 h-6 text-blue-600" />
                </label>
                {/* You can add more icon-only inputs here if needed */}
              </div>
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded min-w-[72px] text-white ${loading ? "cursor-not-allowed" : "bg-blue-600"}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <div className="mt-3"><Loading/></div> : "Post"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCreate;
