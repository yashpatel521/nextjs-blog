import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Get id from params
  try {
    await prisma.post.delete({
      where: { id: parseInt(params.id) },
    });
    return Response.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = +params.id;
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
