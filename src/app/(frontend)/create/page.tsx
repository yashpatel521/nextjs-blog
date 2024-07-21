// src/pages/create.tsx
"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { POST } from "@/lib/request";

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      setEmail(user.email);
    }
  }, [user, router]);

  if (!user) {
    return <div>Redirecting...</div>;
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newPost = { title, content, authorEmail: email };

    try {
      const response = await POST("/posts", newPost);

      if (response.success) {
        setTitle("");
        setContent("");
        setEmail("alice@prisma.io");
        router.replace("/");
      } else {
        setError(response.message || "Failed to create post");
      }
    } catch (error) {
      setError("Failed to create post: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="date"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
