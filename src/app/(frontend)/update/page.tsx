"use client";
import React, { useState, useEffect } from "react";
import { GET, PUT } from "@/lib/request";
import { PostType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePostPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const { replace } = useRouter();
  const [post, setPost] = useState<PostType>({
    id: "",
    title: "",
    content: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const response = await GET(`/posts?id=${postId}`);
        if (response.success) {
          setPost(response.data);
        } else {
          setError(response.message || "Failed to fetch post");
        }
      } catch (error) {
        setError("Failed to fetch post: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Updating post", post);
    try {
      const response = await PUT(`/posts`, post);
      if (response.success) {
        replace("/"); // Redirect to home page after successful update
      } else {
        setError(response.message || "Failed to update post");
      }
    } catch (error) {
      setError("Failed to update post: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Update Post</h1>
      <form onSubmit={handleUpdate} className="max-w-xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter content"
            rows={6}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePostPage;
