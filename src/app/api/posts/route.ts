import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    // get post by id
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    return Response.json({ success: true, data: post });
  } else {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    return Response.json({ success: true, data: posts });
  }
}

export async function POST(request: Request) {
  try {
    // create post
    const { title, content, authorEmail } = await request.json();
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: authorEmail } },
      },
    });
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ success: false, message: error });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    console.log(`Attempting to delete post with id: ${id}`);
    await prisma.post.delete({
      where: { id },
    });
    console.log(`Successfully deleted post with id: ${id}`);
    return Response.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(`Error deleting post with id: ${id}`, error);
    console.error(error);
    return Response.json({
      success: false,
      message: error || "Failed to delete post",
    });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  console.log("Updating post with body:", body);
  try {
    const updatedPost = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return Response.json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
