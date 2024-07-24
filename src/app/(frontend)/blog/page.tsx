"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostType } from "@/lib/types";
import { DELETE, GET } from "@/lib/request";

const Page = ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const [blogData, setBlogData] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const id = searchParams.id;
  const router = useRouter();
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GET(`/posts?id=${id}`);

        if (response.success) {
          setBlogData(response.data);
        } else {
          setError(response.message || "Failed to fetch post data.");
        }
      } catch (error) {
        setError("Failed to fetch post data: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const data = await DELETE(`/posts`, {
        id,
      });
      if (data.success) {
        //   onDelete(id);
        router.replace("/");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleUpdate = () => {
    router.push(`/update?id=${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg font-semibold">No data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {blogData.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {blogData.content}
        </p>
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          <p>
            Author:{" "}
            <span className="font-semibold">{blogData.author?.name}</span>
          </p>
          <p>
            Created At:{" "}
            <span className="font-semibold">
              {new Date(blogData.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
