// src/components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">My Blog</Link>
        </h1>
        <nav>
          {user ? (
            <div className="flex items-center">
              <button
                onClick={logout}
                className="border p-1 rounded-md text-white hover:text-gray-300"
              >
                Log Out
              </button>
              <Link
                href="/create"
                className="border p-1 ml-2 rounded-md text-white hover:text-gray-300"
              >
                Create Post
              </Link>
            </div>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-300">
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
