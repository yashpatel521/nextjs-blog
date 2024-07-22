import { useAuth } from "@/context/AuthContext";
import { DELETE } from "@/lib/request";
import { PostType } from "@/lib/types";
import React from "react";

const PostCard = ({
  post,
  onDelete,
}: {
  post: PostType;
  onDelete: (id: string) => void;
}) => {
  const handleDelete = async (id: string) => {
    try {
      const data = await DELETE(`/posts`, {
        id,
      });
      if (data.success) {
        onDelete(id);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  const { user } = useAuth();

  return (
    <div key={post.id} className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-500 text-sm">{post.createdAt}</p>
      {user && (
        <button
          onClick={() => handleDelete(post.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostCard;
