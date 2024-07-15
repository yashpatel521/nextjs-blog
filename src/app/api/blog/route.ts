import { authorizationService } from "@/utils/authVerfy";
import Cookies from "js-cookie";
export const dynamic = "force-dynamic";
let posts = [
  {
    id: 1,
    title: "First Blog Post",
    description: "This is the description for the first blog post.",
    date: "July 10, 2024",
  },
  {
    id: 2,
    title: "Second Blog Post",
    description: "This is the description for the second blog post.",
    date: "July 11, 2024",
  },
];
export async function GET(request: Request) {
  // get token
  const role = Cookies.get("user");
  console.log(role);
  const token = authorizationService(
    request.headers.get("authorization") as string
  );
  if (token == false) Response.json({ message: "Invalid token" });
  else return Response.json({ data: posts });
}

export async function POST(request: Request) {
  // create post
  const newPost = await request.json();
  console.log(newPost);
  posts.push(newPost);
  return Response.json({ posts });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    return Response.json({ data: posts });
  } else {
    return Response.json({ message: "Post not found" });
  }
}

export async function PUT(request: Request) {}
