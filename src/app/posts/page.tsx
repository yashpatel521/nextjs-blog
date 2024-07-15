"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Blog = () => {
  const [posts, setPosts] = useState<{ data: any[] }>();
  const [loading, setLoading] = useState(true);
  Cookies.set("user", "admin");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "admin",
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-flow-row gap-6">
        {posts &&
          posts.data &&
          posts.data.map(
            (post: {
              id: number;
              title: string;
              description: string;
              date: string;
            }) => (
              <div key={post.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Blog;
