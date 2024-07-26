"use client";
import { PostType } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Assuming you have Card components in "./ui/card"
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deletePost } from "@/lib/action";

const PostCard = ({ post }: { post: PostType }) => {
  const { data: session } = useSession();
  return (
    <Card className="border rounded-lg p-4 shadow-md">
      <CardHeader>
        <CardTitle>
          <Link href={`./blog/${post.id}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <p className="text-gray-500 text-sm">{post.createdAt.toString()}</p>
      </CardContent>
      {session && (
        <CardFooter className="gap-2">
          <Link href={`./blog/update/${post.id}`}>
            <Button variant="default">Update</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={async () => {
              await deletePost(post.id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
