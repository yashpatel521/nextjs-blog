export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Destructure id from params

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = params.id;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { ...body },
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
