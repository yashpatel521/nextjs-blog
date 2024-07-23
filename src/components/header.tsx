// src/components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ToggleTheme } from "./ui/toggleTheme";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="py-4 shadow-md dark:shadow-slate-400">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <Link href="/" className="hover:opacity-75 transition duration-300">
            My Blog
          </Link>
        </h1>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/create"
                className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
              >
                Create Post
              </Link>
              <button
                onClick={logout}
                className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
            >
              Log In
            </Link>
          )}
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
};

export default Header;
