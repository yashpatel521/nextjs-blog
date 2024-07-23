"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/components/postCard";
import { PostType } from "@/lib/types";
import { GET } from "@/lib/request";

const Blog = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await GET("/posts");
        if (response.success) setPosts(response.data);
        else console.log(response.message);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <div key={post.id} className="w-full">
            <PostCard post={post} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
