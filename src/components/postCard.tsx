import { useAuth } from "@/context/AuthContext";
import { DELETE } from "@/lib/request";
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
    <Card className="border rounded-lg p-4 shadow-md">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <p className="text-gray-500 text-sm">{post.createdAt}</p>
      </CardContent>
      {user && (
        <CardFooter className="gap-2">
          <Link href={`/update?id=${post.id}`}>
            <Button variant="default">Update</Button>
          </Link>
          <Button onClick={() => handleDelete(post.id)} variant="destructive">
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
