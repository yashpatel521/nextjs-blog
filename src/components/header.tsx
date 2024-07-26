// src/components/Header.tsx
"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { ToggleTheme } from "./ui/toggleTheme";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="py-4 shadow-md dark:shadow-slate-400">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <Link href="/" className="hover:opacity-75 transition duration-300">
            My Blog
          </Link>
        </h1>
        <nav className="flex items-center space-x-4">
          {!session ? (
            <Link
              href="/login"
              className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
            >
              Log In
            </Link>
          ) : (
            <>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
              >
                Log Out
              </button>
              <Link
                href="/blog/create"
                className="border py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
              >
                Create Post
              </Link>
            </>
          )}
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
};

export default Header;
